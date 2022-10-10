// import { useDispatch } from "react-redux"
import { filterText } from '../reducers/filterReducer'
import { connect } from "react-redux"

const Filter = (props) => {
  // const filter = [...useSelector(state => state.filter)]
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // dispatch(filterText(event.target.value))
    props.filterText(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterText }
)(Filter)

// export default Filter