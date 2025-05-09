import { useEffect, useRef, useState } from "react";
import '../Style/otp.css'

function OtpVerification({phone,handleSubmit}) {

  const [otp, setotp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([])
  // console.log(inputRefs);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newotp = [...otp];
    // only one input 
    newotp[index] = value.substring(value.length - 1);
    setotp(newotp);

    // submitTrigger
    const combineOtp = newotp.join("");
    if (combineOtp.length == 6) {
      console.log(combineOtp);
    }

    //next field
    if (index < (6 - 1) && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current field if it has a value
        newOtp[index] = "";
        setotp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setotp(newOtp);
      }
    }
  };


  return (
    <div className="otp">
      <h2>Authentication</h2>
      <h3>OTP Send On {phone}</h3>
      {otp.map((value, index) => {
        return (
          <input key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        )
      })}
    </div>
  );
}

export default OtpVerification;