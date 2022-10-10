import React from 'react'
import ReactDOM from 'react-dom/client'
// import { legacy_createStore as createStore } from 'redux' - made with configureStore in separate component
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
