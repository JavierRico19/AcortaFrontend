import { Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/navBarStyle.css'
import logo from '../Assets/logo.png';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Shortener from './Shortener';
import Denied from './Denied';
import Redirect from './Redirect';

export default function NavBar() {
    const [navLayer, setNavLayer] = useState(true);
    let token;

    function logOut() {
        localStorage.clear();
        setNavLayer(true);
    };

    useEffect(() => {
        token = localStorage.getItem('token');
        if (token) {
            setNavLayer(false);
        }
    }, []);

    return (
        <div>
            {navLayer ? (
                <nav className='nav'>
                    <NavLink to=''>
                        <img src={logo} alt="logo" width='250' height='70' />
                    </NavLink>
                    <div className='auth-buttons'>
                        <NavLink to='login'>
                            <button className='login-btn'>Log In</button>
                        </NavLink>
                        <NavLink to='signup'>
                            <button className='signup-btn'>Sign Up</button>
                        </NavLink>
                    </div>
                </nav>
            ) : (
                <nav className='nav'>
                        <img src={logo} alt="logo" width='250' height='70' />
                    <div className='auth-buttons'>
                        <NavLink to=''>
                            <button className='login-btn' onClick={logOut}>Log Out</button>
                        </NavLink>
                    </div>
                </nav>
            )}
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='login' element={<Login setNavLayer={setNavLayer} />} />
                <Route path='signup' element={<Signup setNavLayer={setNavLayer} />} />
                <Route path='shortener' element={<Shortener />} />
                <Route path='denied' element={<Denied />} />
                <Route path=':id' element={<Redirect />} />
            </Routes>
        </div>
    )
};