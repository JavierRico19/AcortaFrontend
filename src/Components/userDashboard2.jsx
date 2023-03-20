import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/userDashboard.css';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard2(props) {
    const [longUrl, setLongUrl] = useState(props.longUrl);
    const [shortUrl, setShortUrl] = useState(props.shortUrl);

    let navigate = useNavigate();
    let token = localStorage.getItem('token');


    const editUrl = async () => {
        token = localStorage.getItem('token');
        const req = {
            url: shortUrl,
            newUrl: longUrl
        };
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API}/api/private/patch`, req, {
                headers: {
                    Authorization: token
                }
            });
        } catch (error) {
            navigate('/denied');
        }
    };

    const deleteUrl = async () => {
        token = localStorage.getItem('token');
        const stringUrl = shortUrl.toString();
        let req = {
            headers: {
                Authorization: token
            },
            data: {
                url: stringUrl
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/private/delete`, req);
        } catch (error) {
            navigate('/denied');
        }
    };

    useEffect(() => {
        token = localStorage.getItem('token');
    }, []);

    return (
        <div className='user-urls'>
            <form className='editUrl-form'>
                <p className='url-title'>Long URL:</p>
                <input type="url" onChange={(event) => { setLongUrl(event.target.value) }} value={longUrl} />
                <input type="Submit" value="Edit" onClick={(event) => editUrl(event)} />
            </form>
            <form className='deleteUrl-form'>
                <p className='url-title'>Short URL:</p>
                <input id="url-to-delete" value={`http://localhost:3000/${shortUrl}`} />
                <input type="submit" value="Delete Url" onClick={deleteUrl} />
            </form>
        </div>
    )
}

