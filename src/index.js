import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from "./context/UserContext"
import NumberRegister from './pages/NumberRegister';
import { ChatContextProvider } from './context/ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="number-register" element={<NumberRegister />} />
            <Route path="register" element={<Register />} />
          </Routes >
        </BrowserRouter >
      </ChatContextProvider>
    </UserContextProvider>
  </React.StrictMode>

);


