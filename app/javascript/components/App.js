import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';


export default function App(){
    return <Router>
        <Routes>
            <Route path='/' element={ <Login />} exact/>
            <Route path='/signup' element={ <Signup />} exact/>
            <Route path='/home/:email' element={ <Home />} exact/>
        </Routes>
    </Router>
}