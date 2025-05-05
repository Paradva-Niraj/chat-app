import '../Style/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [form, setForm] = useState({ phone: '', password: '' });
    
    const nav = useNavigate();

    const handleChange = e => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/api/auth/login',form);
            // alert("Login Success");
            localStorage.setItem('token',res.data.token);
            nav('/');
        }
        catch (err){
            alert(err.response?.data?.msg || "Login Failed")
        }

    }

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input name="phone" type='tel' maxLength="10" pattern="\d{10}" placeholder="Phone" onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </>
    );
}

export default Login;