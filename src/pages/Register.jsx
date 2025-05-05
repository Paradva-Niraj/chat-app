import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    
    const [form,setForm] = useState({phone:'',password:'',name:'',dob:''})

    const nav = useNavigate();

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/api/auth/register',form);
            // alert(res.data.msg);
            nav('/login')
        }
        catch (err){
            alert(err.response?.data?.msg || "Register Error");
        }
    }
    
    return (<>
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
            />
            <input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                onChange={handleChange}
                required
            />
            <input
                name="phone"
                type="tel"
                maxLength="10"
                pattern="\d{10}"
                placeholder="Phone"
                title="Enter a 10-digit phone number"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
    </>
    );
}

export default Register;