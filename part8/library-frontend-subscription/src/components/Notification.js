const Notification = ({ notification, setNotification }) => {

  const removeNotification = () => {
    setNotification(null)
  }

  if (notification) {
    return (
      <div  style={{ display: 'flex' }}>
        <div className="notification">{notification}</div><button style={{ margin: 'auto', zIndex: '2' }} type="button" onClick={removeNotification}>ok</button>
      </div>
    )
  }
}

export default Notification