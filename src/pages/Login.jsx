import '../Style/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login({setIsAuthenticated }) {

    const [form, setForm] = useState({ phone: '', password: '' });
    const [user, setUser] = useState(null);
    const nav = useNavigate();

    const URL = import.meta.env.VITE_AUTH_URL;

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value.trim() })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${URL}login`, form);
            // alert("Login Success");
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userPhone', res.data.user.phone); 
            setUser(res.data.user);
            setIsAuthenticated(true);
            nav("/chat", { state: { user: res.data.user } });
            // console.log(res.data.user);
        }
        catch (err) {
            alert(err.response?.data?.msg || "Login Failed")
        }

    }

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                <input
                    name="phone"
                    type="tel"
                    maxLength="15"
                    // pattern="^\+[1-9]\d{1,14}$"
                    inputMode="tel"
                    placeholder="+91XXXXXXXXXX"
                    onChange={handleChange}
                    required
                />

                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </>
    );
}

export default Login;