import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/main';
import Order from './components/order';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';

const Header = () => <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>Order your pizza here...</p>
</header>

function App() {

    return (
        <div className="App">
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="order" element={<Order />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
