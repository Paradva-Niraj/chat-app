import { useEffect, useRef, useState } from "react";
import "../Style/otp.css";
import axios from "axios";

function OtpVerification({ phone, handleSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [loading, setIsLoading] = useState(true);
  const [reloading, setReLoading] = useState(true);

  useEffect(() => {
    inputRefs.current[0].focus();
    sendOTP(phone);
  }, [])

  const sendOTP = async (phone) =>{
    setIsLoading(true);
    setReLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}sendOTP`,{phone});
      if(res.data.success){
        alert("Verification OTP Send Successfully");
        setReLoading(false);
      }
    } catch (error) {
        console.log(error);
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const code = otp.join("");
      const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}confirmOTP`,{phone,code});
      if(res.data.status === "approved"){
        handleSubmit();
      }
    } catch (error) {
    console.log(error);
    }
  }

  const handleChange = (index, e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "").split("");

    if (digits.length === 0) return;

    const updatedOtp = [...otp];

    let currentIndex = index;
    digits.forEach((digit) => {
      if (currentIndex < 6 && currentIndex != 6) {
        updatedOtp[currentIndex] = digit;
        currentIndex++;
      }
    });

    setOtp(updatedOtp);

    if (currentIndex < 6) {
      inputRefs.current[currentIndex]?.focus();
    }
    if(updatedOtp.join("").length == 6){
      setTimeout(()=>{
        setIsLoading(false);
      },3000)
    }
  };


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      if (otp[index] && index < 6) {
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="otp">
      <h2>Authentication</h2>
      <h3>OTP sent to {phone}</h3>

      <div className="otp-input-group">
        {otp.map((val, idx) => (
          <input
            key={idx}
            type="text"
            value={val}
            ref={(el) => (inputRefs.current[idx] = el)}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            maxLength={1}
            className="otpInput"
          />
        ))}
      </div>
      <div className="button-group">
        <button
          onClick={handleVerifyOtp}
          className="verify-btn"
          disabled={loading || otp.join("").length !== 6}
        >
          {loading ? "Processing..." : "Verify OTP"}
        </button>

        <button
          onClick={()=>{sendOTP(phone)}}
          className="resend-btn"
          disabled={loading}
        >
          {reloading ? "Processing..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;