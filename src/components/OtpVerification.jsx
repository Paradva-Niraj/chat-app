import { useEffect, useRef, useState } from "react";
import "../Style/otp.css";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase.config";

function OtpVerification({ phone, handleSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const initRecaptchaAndSendOTP = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Sending OTP to:", phone);


        // Create reCAPTCHA container if missing
        if (!document.getElementById("recaptcha-container")) {
          const container = document.createElement("div");
          container.id = "recaptcha-container";
          document.body.appendChild(container);
        }

        // Clear old verifier if it exists
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear?.();
        }

        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved");
            },
          },
          auth
        );

        const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
        setConfirmationResult(result);
        console.log("OTP sent successfully");
      } catch (error) {
        console.error("Error sending OTP:", error);
        setError(error.message || "Failed to send OTP.");
      } finally {
        setLoading(false);
      }
    };

    initRecaptchaAndSendOTP();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear?.();
        window.recaptchaVerifier = null;
      }
    };
  }, [phone]);

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    if (!confirmationResult) {
      setError("OTP not yet sent. Please wait.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await confirmationResult.confirm(code);
      console.log("OTP verified successfully");
      handleSubmit();
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
    setError(null);
    setConfirmationResult(null);

    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear?.();
      window.recaptchaVerifier = null;
    }

    const container = document.getElementById("recaptcha-container");
    if (!container) {
      const newContainer = document.createElement("div");
      newContainer.id = "recaptcha-container";
      document.body.appendChild(newContainer);
    }

    // Re-initiate the OTP flow
    try {
      setLoading(true);
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );

      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      console.log("OTP resent successfully");
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp">
      <h2>Authentication</h2>
      <h3>OTP sent to {phone}</h3>

      {error && <div className="error-message">{error}</div>}

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
            disabled={loading}
          />
        ))}
      </div>

      <div id="recaptcha-container" style={{ display: "none" }}></div>

      <div className="button-group">
        <button
          onClick={handleVerifyOtp}
          className="verify-btn"
          disabled={loading || otp.join("").length !== 6}
        >
          {loading ? "Processing..." : "Verify OTP"}
        </button>

        <button
          onClick={resendOtp}
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
