import { useEffect, useRef, useState } from "react";
import "../Style/otp.css";

function OtpVerification({ phone, handleSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {

    inputRefs.current[0].focus();

    const accountSid = import.meta.env.VITE_TWILIO_ID;
    const authToken = import.meta.env.VITE_TWILIO_AUTH;

    const client = require('twilio')(accountSid, authToken);

    client.verify.v2.services("VA3108c5f2c4e8dc6094189ba9d3c702d5")
      .verifications
      .create({ to: {phone}, channel: 'sms' })
      .then(verification => console.log(verification.sid));
  }, [])

  const handleChange = (index, e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, "").split("");

    if (digits.length === 0) return;

    const updatedOtp = [...otp];

    let currentIndex = index;
    digits.forEach((digit) => {
      if (currentIndex < 6) {
        updatedOtp[currentIndex] = digit;
        currentIndex++;
      }
    });

    setOtp(updatedOtp);

    if (currentIndex < 6) {
      inputRefs.current[currentIndex]?.focus();
    } else {
      inputRefs.current[5]?.blur(); // optional: remove focus
    }
  };


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      if (otp[index]) {
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
          // onClick={handleVerifyOtp}
          className="verify-btn"
          disabled={loading || otp.join("").length !== 6}
        >
          {loading ? "Processing..." : "Verify OTP"}
        </button>

        <button
          // onClick={resendOtp}
          className="resend-btn"
          disabled={loading}
        >
          {loading ? "Processing..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;