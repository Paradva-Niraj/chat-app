import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure capitalization is correct
import OtpVerification from "../components/OtpVerification";
    
function Register() {
    const [form, setForm] = useState({ phone: '', password: '', name: '', dob: '' });
    const [otpState, setOtpState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}register`, form);
            alert(res.data.msg || "Registration successful!");
            nav('/login');
        }
        catch (err) {
            alert(err.response?.data?.msg || "Register Error");
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleOTP = (e) => {
        e.preventDefault();

        const { name, dob, phone, password } = form;

        if (!name || !dob || !phone || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate phone number format
        const phoneRegex = /^\+[0-9]{1,3}[0-9]{6,14}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid international phone number (e.g., +911234567890)");
            return;
        }

        console.log("Sending OTP to:", phone);
        setOtpState(true);
    };

    return (
        <div className="register-container">
            {!otpState ? (
                <div className="auth-form">
                    <h2>REGISTER</h2>
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="dob"
                        type="date"
                        placeholder="Date of Birth"
                        value={form.dob}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number (e.g., +911234567890)"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />



{/* //comment because not get free sms otp service */}




                    {/* <button onClick={handleOTP} disabled={isLoading}>
                        {isLoading ? "Processing..." : "Send OTP"}
                    </button> */}
                    <button onClick={handleSubmit} >
                        Register
                    </button>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            ) : (
                <OtpVerification phone={form.phone} handleSubmit={handleSubmit} />
            )}
        </div>
    );
}

export default Register;