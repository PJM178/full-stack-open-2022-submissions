import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification.message)
  console.log(notification.messageType)



  if (notification.message) {
    return (
      <div className={notification.messageType}>
        {notification.message}
      </div>
    )
  }
}

export default Notification