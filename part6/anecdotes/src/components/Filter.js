import { useDispatch } from "react-redux"
import { filterText } from '../reducers/filterReducer'

const Filter = () => {
  // const filter = [...useSelector(state => state.filter)]
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterText(event.target.value))
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

export default Filter