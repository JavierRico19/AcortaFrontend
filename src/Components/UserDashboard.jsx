import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/userDashboard.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserDashboard2 from './userDashboard2';

export default function UserDashboard(props) {
    const [idUrls, setIdUrls] = useState([]);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [name, setName] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [input, setInput] = useState(true);
    const [longUrl, setLongUrl] = useState('');
    let apiCall = `${process.env.REACT_APP_API}/api/private/url`;
    let navigate = useNavigate();
    let token;



    const getUrls = async () => {
        token = localStorage.getItem('token');
        let config = { headers: { Authorization: token } }
        try {
            const res = await axios.get(apiCall, config);
            const response = res.data;
            setIdUrls(response);
        } catch (error) {
            navigate('/denied');
        }
    };

    const onSubmit = async (data) => {
        try {
            setInput(false);
            token = localStorage.getItem('token');
            let config = { headers: { Authorization: token } }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/private/post`, data, config);
            setShortUrl(`http:localhost:3000/${res.data.shortUrl}`);
            setLongUrl(`http://localhost:3000/${res.data.longUrl}`);
        } catch (error) {
            navigate('/denied');
        }
    };

    const copyLink = async (data) => {
        const input = document.getElementById("input-url");
        const value = input.value;
        navigator.clipboard.writeText(value);
    };

    const resetInput = async () => {
        setInput(true);
        window.location.reload();
    };


    useEffect(() => {
        token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        setName(name);
        getUrls();
    }, []);



    return (
        <div className='dashboard'>
            <h1 className='user-title'>Hi, {name}!</h1>
            {input ? (
                <div className='user-container'>
                    <form className='url-form' onSubmit={handleSubmit(onSubmit)}>
                        <input className="input-url" type="url" {...register("url", {
                            required: true,
                            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
                        })} />
                        <input className="input-url-btn" type="submit" value="Get URL" /><br></br>
                        {errors.url?.type === 'required' && <p>Url field is empty!</p>}
                    </form>
                </div>
            ) : (
                <div className='user-container'>
                    <form className='url-form' onSubmit={handleSubmit(copyLink)}>
                        <input id="input-url" className="input-url" type="url" readOnly value={shortUrl} />
                        <input className="input-url-btn2" type="submit" value="Copy URL" />
                        <button className="input-reset-btn" onClick={resetInput}>Reset Input</button>
                    </form>
                </div>
            )}<br></br>
            <div className='url-map'>
                {
                    idUrls.map(ind => <UserDashboard2 longUrl={ind.longUrl} shortUrl={ind.shortUrl} />)
                }
            </div>
        </div>
    )
};