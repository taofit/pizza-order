import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import Restaurants from './components/restaurantList';

const Header = () => <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>Order your pizza here...</p>
</header>

function App() {


  return (
    <div className="App">
        <Header />
        <Restaurants />
    </div>
  );
}

export default App;
