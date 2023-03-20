import '../Styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Login(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [errorMsg, setErrorMsg] = useState('');
    const [layer, setLayer] = useState(false);
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/public/login`, data);
            props.setNavLayer(false);
            let token = res.data.token;
            let name = res.data.userData.name;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            navigate('/shortener');
        } catch (error) {
            setErrorMsg(error.response.data);
            setLayer(true);
        }
    };

    return (
        <div className='container'>
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Log In</h3>
                    <p>Email</p>
                    <input type="text" {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
                    })} />
                    <p>Password</p>
                    <input type="password" {...register("password", {
                        required: true
                    })} /><br></br>
                    <input type="submit" value="Log in" className="login-form-btn"/>
                    {layer && <p>{errorMsg}</p>}
                    {errors.email?.type === 'required' && <p>Email field is required</p>}
                    {errors.email?.type === 'pattern' && <p>Wrong email format</p>}
                    {errors.password?.type === 'required' && <p>Password field is required</p>}
                </form>
            </div>
        </div>
    )
}