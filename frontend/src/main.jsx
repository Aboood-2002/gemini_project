import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatContextProvider from './Context/ChatContext.jsx'
import { UserProvider } from "./Context/UserContext.jsx";
export const server = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UserProvider>
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
  </UserProvider>
  </React.StrictMode>
)


