import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../context/authContext';

const Login = () => {
  const auth = useAuth();
const userLoggedIn = auth?.userLoggedIn ?? false;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Firebase Email/Password Login
  const handleManualLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      try {
        await doSignInWithEmailAndPassword(formData.email, formData.password);
        alert('Login successful');
        navigate('/home');
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  // ✅ Firebase Google Login
  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
      alert('Google login successful');
      navigate('/home');
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <>
    <style>{`
    .login-container {
          width: 350px;
          margin: 50px auto;
         padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          background: #fff;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .login-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .login-desc {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 20px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 15px;
        }

        .login-input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .login-btn {
          padding: 10px;
          border: none;
          border-radius: 8px;
          background:black;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-btn:hover {
          background: #5d0202ff;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          background: #fff;
          border: 1px solid #ddd;
          color: #555;
          font-weight: 500;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .google-btn img {
          width: 20px;
          height: 20px;
        }

        .google-btn:hover {
          background: #f7f7f7;
        }

        .account {
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .account a {
          color:#4338ca;
          text-decoration: none;
          font-weight: bold;
        }

        .error-msg {
          color: red;
          font-size: 0.8rem;
          margin-top: -8px;
          margin-bottom: 5px;
          text-align: left;
        }
      
      `}</style>
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-desc">Please enter your credentials or use your Google account.</p>
      <form className="login-form" onSubmit={handleManualLogin} noValidate>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {submitted && errors.email && <div className="error-msg">{errors.email}</div>}

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {submitted && errors.password && <div className="error-msg">{errors.password}</div>}

        <button className="login-btn" type="submit">Login</button>
      </form>

      <div className="google-btn-container">
        <button className="login-btn" onClick={handleGoogleLogin}>Login with Google</button>
      </div>

      {/*<div className="account">
        <p>Don't have an account?<Link to="/signup">Signup</Link></p>
      </div>*/}
    </div>
    </>
  );
};

export default Login;
