﻿import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { GlobalProvider } from './Context/GlobalState';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login'
import Adminlogin from './components/Adminlogin'
import Register from './components/Register'; 
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout'
import Return from './components/Return'
import Reserve from './components/Reserve'
import DocList from './components/DocList'
import Tabs from './components/Tabs';
import Fine from './components/Fine';

import SearchResult from './components/SearchResult';
import SearchDoc from './components/SearchDocument';
import AdminSearchResult from './components/AdminSearchResult';

const App = () => {

  return (
    <Router>
      <GlobalProvider>
        <Navbar />
        <Tabs />
        <section className='container'>
       
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path ="/login" element={<Login />} />
            <Route path ="/adminLogin" element={<Adminlogin />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/searchresult" element={<SearchResult /> } />
            <Route path="/searchDoc" element={<SearchDoc /> } />
            <Route path="/Checkout" element={<Checkout /> } />
            <Route path="/Return" element={<Return /> } />
            <Route path="/Reserve" element={<Reserve /> } />
            <Route path="/Fine" element={<Fine /> } />
            <Route path="/DocList" element={<DocList /> } />
            <Route path="/adminSearchResult" element={<AdminSearchResult /> } />
          </Routes>
        </section>

      </GlobalProvider> 
    </Router>
      
  );
}

export default App;
