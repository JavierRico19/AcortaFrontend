import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import '../Styles/shortener.css';


export default function Redirect () {
    const { id } = useParams();

    const apiCall = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/public/${id}`);
        const redirection = res.data;
        window.location.replace(redirection);
    };

    useEffect(()=>{
        apiCall();
    }
    ,[]);

    return(
        <div className='denied-container'>
            <div className="denied-text">
            <h1>Error!</h1>
            <h2>Something went wrong...</h2>
            <p>make sure the url you entered is linked</p>
            </div>
        </div>
    )
}