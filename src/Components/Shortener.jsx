import { useState, useEffect } from 'react';
import UserDashboard from './UserDashboard';
import Denied from './Denied';
import '../Styles/shortener.css';


export default function Shortener() {
    const [auth, setAuth] = useState(false);
    let token;

    useEffect(() => {
        token = localStorage.getItem('token');
        if (token) {
            setAuth(true);
        }
    }, []);

    return (
        <div>
            {auth ? (
                <div>
                    <UserDashboard />
                </div>
            ) : (
                <div>
                    <Denied />
                </div>
            )}
        </div>
    )
}


