import { connect } from 'react-redux'
// import { createNotification } from '../reducers/notificationReducer'
// import { useSelector } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  // const notification = (message) => {
  //   props.createNotification(message)}
  const notification = props.notification.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // no trace to console elements
  if (notification) {
    return (
        <div style={style}>
        {notification}
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)