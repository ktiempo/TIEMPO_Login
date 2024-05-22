import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='/' element={Login} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
