const { UserInputError, AuthenticationError } = require('apollo-server')
// not for production - look up on the internet!
const { PubSub } = require('graphql-subscriptions')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && !args.genre) {
        return Book.find({ author: author._id }).populate('author')
      } else if (args.genre && !args.author) {
        return Book.find({ genres: { $in: args.genre }}).populate('author').collation( { locale: 'en', strength: 2 } )
      } else if (args.genre && args.author) {
        const books = await Book.find({ author: author._id }).populate('author')
        return books.filter(book => book.genres.find(genre => genre.toLowerCase() === args.genre.toLowerCase()))
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
      // const author = await Author.find({})
      // console.log(author[0].books.length)
      // return Author.find({}).populate('books')
      return Author.find({})
    },
    me: async (root, args, context) => {
      if (context.currentUser) {
        return context.currentUser
      } else {
        const decodedToken = jwt.verify(args.token.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
      
    },
    recommendBook: async (root, args, context) => {
      if (context.currentUser) {
        return Book.find({ genres: { $in: context.currentUser.favouriteGenre }}).populate('author').collation( { locale: 'en', strength: 2 } )
      } else {
      const decodedToken = jwt.verify(args.token.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return Book.find({ genres: { $in: currentUser.currentUser.favouriteGenre }}).populate('author').collation( { locale: 'en', strength: 2 } )
      }
    },
    uniqueGenres: async (root, args) => {
      const genres = await Book.distinct('genres').collation( { locale: 'en', strength: 2 } )
      return genres
    }
  },
  Author: {
    bookCount: async (root) => {
      // author model books field length, no need to populate to save a query
      return root.books.length
      // const author = await Author.findOne({ name: root.name })
      // return Book.find({ author: author._id }).countDocuments()
      // return author.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        const newAuthor = new Author({ name: args.author })

        try {
          await newAuthor.save()
          const book = new Book({ ...args, author: newAuthor })
          await book.save()
          // saving added books ids to author model books field for later referencing
          newAuthor.books = newAuthor.books.concat(book._id)
          await newAuthor.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      } else {
        try {
          const book = new Book({ ...args, author: author })
          await book.save()
          author.books = author.books.concat(book._id)
          await author.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name})
      author.born = args.setBornTo
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'test') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers