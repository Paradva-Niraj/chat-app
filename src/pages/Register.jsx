import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpVerification from "../components/otpVerification";

function Register() {

    const [form, setForm] = useState({ phone: '', password: '', name: '', dob: '' })
    const [otpState, setOtpState] = useState(false);

    const nav = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}register`, form);
            // alert(res.data.msg);
            nav('/login')
        }
        catch (err) {
            alert(err.response?.data?.msg || "Register Error");
        }
    }
    const handleOTP = (e) => {
        e.preventDefault();

        const { name, dob, phone, password } = form;

        if (!name || !dob || !phone || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid international phone number (e.g., +91 9876543210)");
            return;
        }

        // console.log("Form data:", form);
        setOtpState(true);
    };

    return (<>

        {!otpState &&
            <div className="auth-form">
                <h2>REGISTER</h2>
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
                    pattern="/^\+(?:[0-9] ?){6,14}[0-9]$/"
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

                <button onClick={handleOTP}>Send OTP</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        }
        <div>
            {otpState &&
                <OtpVerification phone={form.phone} handleSubmit={handleSubmit} />
            }
        </div>
    </>
    );
}

export default Register;