import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure capitalization is correct
import OtpVerification from "../components/OtpVerification";
// import { RecaptchaVerifier } from "firebase/auth/web-extension";
// import { auth } from "../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Register() {
    const [form, setForm] = useState({ phone: '', password: '', name: '', dob: '' });
    const [otpState, setOtpState] = useState(false);
    const [isPhoneAuthTriggered, setIsPhoneAuthTriggered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();
    //  Global listener callback for Phone.Email response
    useEffect(() => {
        if (!isPhoneAuthTriggered) return;

        const container = document.getElementById('pe-button-container');
        if (!container) return;

        // Clear previous buttons/scripts
        container.innerHTML = '';
        const oldScript = document.getElementById('pe-script');
        if (oldScript) oldScript.remove();

        // Create Phone.Email sign-in button
        const button = document.createElement('div');
        button.className = 'pe_signin_button';

        // Note: Use hyphenated data attribute names as per docs
        button.setAttribute('data-client-id', '17001972264298235794');
        button.setAttribute('data-callback', 'phoneEmailListener');
        container.appendChild(button);

        // Load Phone.Email sign-in script asynchronously
        const script = document.createElement('script');
        script.src = 'https://www.phone.email/sign_in_button_v1.js';
        script.async = true;
        script.id = 'pe-script';
        document.body.appendChild(script);

        // Define the callback globally for Phone.Email
        window.phoneEmailListener = async function (data) {
            if (!data?.user_json_url) {
                alert("Authentication failed. No data received.");
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetch(data.user_json_url);
                const userData = await res.json();

                // Compose registration payload
                const payload = {
                    name: form.name || `${userData.user_first_name} ${userData.user_last_name}`,
                    dob: form.dob || "",
                    phone: `${userData.user_country_code}${userData.user_phone_number}`,
                    password: form.password || "defaultPassword123"
                };
                console.log("inside")

                const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}register`, payload);
                alert(response.data.msg || "Registration successful!");
                nav('/login');
            } catch (err) {
                console.error("Registration error:", err);
                alert("Failed to register.");
            } finally {
                setIsLoading(false);
            }
        };

        return () => {
            // Cleanup script and callback on unmount or re-run
            document.getElementById('pe-script')?.remove();
            delete window.phoneEmailListener;
        };
    }, [isPhoneAuthTriggered]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const triggerPhoneEmailAuth = () => {
        // This triggers the Phone.Email sign-in flow via their widget
        setIsPhoneAuthTriggered((prev) => (!prev));
    };

//this not need useeffect handle this also this is use in firebase and twilio
    const handleSubmit = async () => {
        const trimmedForm = {
            name: form.name.trim(),
            dob: form.dob.trim(),
            phone: form.phone.trim(),
            password: form.password.trim()
        };

        try {
            setIsLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}register`, trimmedForm);
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
    // firebase otp send send otp and RecaptchaVerifier code comment after phone email auth
    // const handleOTP = async (e) => {
    //     e.preventDefault();
    //     const trimmedForm = {
    //         name: form.name.trim(),
    //         dob: form.dob.trim(),
    //         phone: form.phone.trim(),
    //         password: form.password.trim()
    //     };

    //     const { name, dob, phone, password } = trimmedForm;

    //     if (!name || !dob || !phone || !password) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }

    //     // Validate phone number format
    //     const phoneRegex = /^\+[0-9]{1,3}[0-9]{6,14}$/;
    //     if (!phoneRegex.test(phone)) {
    //         alert("Please enter a valid international phone number (e.g., +911234567890)");
    //         return;
    //     }

    //     console.log("Sending OTP to:", phone);
    //     // setOtpState(true);
    //     try {
    //         if (!window.recaptchaVerifier) {
    //             window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //                 size: 'invisible',
    //                 callback: () => { }
    //             });
    //         }
    //         const appVerifier = window.recaptchaVerifier;
    //         const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
    //         window.confirmationResult = confirmationResult;
    //         console.log("OTP sent via Firebase");
    //         setOtpState(true);
    //     }
    //     catch (error) {
    //         console.error("Firebase OTP Error:", error);
    //         alert("Error sending OTP. Try again.");
    //     }
    // };




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
                    {/* changes after phonemail auth */}
                    <input
                        name="phone"
                        type="tel"
                        className="pe_phone_number"
                        placeholder="Phone Number (e.g., 1234567890)"
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

                    {/* firebase recaptcha */}
                    {/* <div id="recaptcha-container"></div> */}

                    {/* //comment because not get free sms otp service */}

                    {/* Phone.Email Sign-In Button placeholder */}
                    {isPhoneAuthTriggered && <div id="pe-button-container"></div>}

                    <button
                        onClick={() => setIsPhoneAuthTriggered(true)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Verify with Phone"}
                    </button>

                    {/* <button onClick={handleSubmit} >
                        Register
                    </button> */}
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            ) : (
                <OtpVerification phone={form.phone} handleSubmit={handleSubmit} />
            )}
        </div>
    );
}

export default Register;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const [form, setForm] = useState({
//     phone: '',
//     password: '',
//     name: '',
//     dob: ''
//   });

//   const [isPhoneAuthTriggered, setIsPhoneAuthTriggered] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const nav = useNavigate();

//   useEffect(() => {
//     if (!isPhoneAuthTriggered) return;

//     const container = document.getElementById('pe-button-container');
//     if (!container) return;

//     // Clear previous buttons/scripts
//     container.innerHTML = '';
//     const oldScript = document.getElementById('pe-script');
//     if (oldScript) oldScript.remove();

//     // Create Phone.Email sign-in button
//     const button = document.createElement('div');
//     button.className = 'pe_signin_button';

//     // Note: Use hyphenated data attribute names as per docs
//     button.setAttribute('data-client-id', '17001972264298235794');
//     button.setAttribute('data-callback', 'phoneEmailListener');
//     container.appendChild(button);

//     // Load Phone.Email sign-in script asynchronously
//     const script = document.createElement('script');
//     script.src = 'https://www.phone.email/sign_in_button_v1.js';
//     script.async = true;
//     script.id = 'pe-script';
//     document.body.appendChild(script);

//     // Define the callback globally for Phone.Email
//     window.phoneEmailListener = async function (data) {
//       if (!data?.user_json_url) {
//         alert("Authentication failed. No data received.");
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const res = await fetch(data.user_json_url);
//         const userData = await res.json();

//         // Compose registration payload
//         const payload = {
//           name: form.name || `${userData.user_first_name} ${userData.user_last_name}`,
//           dob: form.dob || "",
//           phone: `${userData.user_country_code}${userData.user_phone_number}`,
//           password: form.password || "defaultPassword123"
//         };

//         const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}register`, payload);
//         alert(response.data.msg || "Registration successful!");
//         nav('/login');
//       } catch (err) {
//         console.error("Registration error:", err);
//         alert("Failed to register.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     return () => {
//       // Cleanup script and callback on unmount or re-run
//       document.getElementById('pe-script')?.remove();
//       delete window.phoneEmailListener;
//     };
//   }, [isPhoneAuthTriggered]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="register-container">
//       <div className="auth-form">
//         <h2>REGISTER</h2>

//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="dob"
//           type="date"
//           placeholder="Date of Birth"
//           value={form.dob}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="phone"
//           type="tel"
//           className="pe_phone_number"
//           placeholder="Phone Number (e.g., +911234567890)"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         {/* Phone.Email Sign-In Button placeholder */}
//         {isPhoneAuthTriggered && <div id="pe-button-container"></div>}

//         <button
//           onClick={() => setIsPhoneAuthTriggered(true)}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Verify with Phone"}
//         </button>

//         <p>Already have an account? <Link to="/login">Login here</Link></p>
//       </div>
//     </div>
//   );
// }

// export default Register;
