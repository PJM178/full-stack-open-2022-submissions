describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Petri Montonen',
      username: 'petri',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    const user2 = {
      name: 'Jorma Montonen',
      username: 'jorma',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      const name = 'Petri Montonen'
      cy.get('#username').type('petri')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.contains(`${name} logged in`)
    })

    it('fails with wrong credentials', function() {
      const name = 'Petri Montonen'
      cy.get('#username').type('petri')
      cy.get('#password').type('false')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', `${name} logged in`)
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'petri', password: 'testi' })
      // cy.get('#username').type('petri')
      // cy.get('#password').type('testi')
      // cy.get('#login-button').click()
      cy.contains('show').click()
      cy.createBlog({
        title: 'test blog',
        author: 'cypress v2',
        url: 'http://localhost:3003'
      })
    })

    it('A blog can be created', function() {
      cy.contains('show').click()
      cy.get('#formTitle').type('a blog created by cypress')
      cy.get('#formAuthor').type('cypress')
      cy.get('#formUrl').type('http://localhost:3000/')
      cy.contains('submit').click()
      cy.get('html').should('contain', 'a blog created by cypress')
      cy.contains('view').click()
      cy.contains('http://localhost:3000/')

      cy.createBlog({
        title: 'another blog craeted by cypress',
        author: 'cypress v2',
        url: 'http://localhost:3003'
      })

      cy.get('html').should('contain', 'another blog craeted by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('test blog')
        .contains('view')
        .click()
        .get('#likeBlog').click()
      cy.visit('http://localhost:3000')
      cy.get('html').should('contain', 'likes 1')
      cy.contains('test blog')
        .contains('view')
        .click()
        .get('#likeBlog').click()
      cy.visit('http://localhost:3000')
      cy.get('html').should('contain', 'likes 2')
    })
    it('A blog can be deleted', function() {
      cy.contains('test blog')
        .contains('view')
        .click()
        .get('#deleteBlogButton').click()
      cy.get('html').should('not.contain', 'test blog')
    })
    it('A blog can only be deleted by the user who posted it', function() {
      cy.get('#deleteBlogButton')
      cy.contains('logout').click()
      cy.get('#username').type('jorma')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.get('#deleteBlogButton').should('not.exist')
    })
    it.only('blogs are ordered by likes', function() {
      cy.createBlog({
        title: 'another blog craeted by cypress',
        author: 'cypress v2',
        url: 'http://localhost:3003'
      })
      cy.get('.blog').eq(1).should('contain', 'test blog cypress v2')
      cy.get('.blog').eq(0).should('contain', 'another blog craeted by cypress cypress v2')
      cy.get('.blog').eq(1)
        .contains('view').click()
        .get('.moreInfo').eq(1)
        .contains('like').click()
      cy.visit('http://localhost:3000')
      cy.get('.blog').eq(0).should('contain', 'test blog cypress v2')
      cy.get('.blog').eq(1).should('contain', 'another blog craeted by cypress cypress v2')
    })
  })
})