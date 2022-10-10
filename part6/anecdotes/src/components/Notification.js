import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // no trace to console elements
  if (notification.message) {
    return (
        <div style={style}>
        {notification.message}
        </div>
    )
  }

  // lower amount of code if more elements on falsy
  // return (
  //   <div>
  //   {notification.message !== "" ?
  //     <div style={style}>
  //     {notification.message}
  //     </div> :
  //     <div></div>
  //   }
  //   </div>
  // )
}

export default Notification