import React, { useState } from 'react';
import axios from "axios";
import './Signup.css';

function Signupp() {
  const [page, setPage] = useState('login');
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Login states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Signup states
  const [fullName, setFullName] = useState('');
  const [password2, setPassword2] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailAddr, setEmailAddr] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === password2 && password.length > 8) {
        const response = await axios.post("http://127.0.0.1:8000/accounts/api/register/", {
          fullname: fullName,
          email: emailAddr,
          phoneno: mobileNo,
          password: password,
        });
        console.log('Register successfully.', response.data);
        alert("Registration Success!");
      } else {
        alert("Passwords do not match or password too short.");
      }
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      alert("Register failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/api/login/", {
        email: emailOrPhone,
        password: password,
        role: role,
      });
      console.log("Login successful:", response.data);
      alert("Login success!");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed!");
    }
  };

  return (
    <div className="bg-green-300 h-screen flex items-center justify-center">
      <div className="bg-gray-50 w-full max-w-sm p-8 pb-4 rounded-lg">

        {/* Toggle buttons */}
        <div className="bg-gray-500 p-1 rounded-md mb-4 flex justify-between items-center">
          <button
            className={`text-black font-bold w-[50%] ${page === 'login' ? 'bg-green-700 text-white rounded-md' : ''}`}
            onClick={() => setPage('login')}
          >Login</button>
          <button
            className={`text-black font-bold w-[50%] ${page === 'signup' ? 'bg-green-700 text-white rounded-md' : ''}`}
            onClick={() => setPage('signup')}
          >Sign Up</button>
        </div>

        {/* LOGIN FORM */}
        {page === 'login' && (
          <form onSubmit={handleLogin}>
            <p className="text-black text-center text-xl font-bold mb-1">Welcome back!</p>
            <input
              className="w-full p-2 mb-3 rounded-md bg-white border"
              type="text"
              placeholder="Mobile Number / Email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
            <input
              className="w-full p-2 mb-3 rounded-md bg-white border"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Role dropdown */}
            <div className="relative w-full">
              <input
                className="w-full p-2 pr-12 mb-3 rounded-md bg-white border"
                type="text"
                placeholder="Role"
                value={role}
                onClick={() => setIsOpen(!isOpen)}
                readOnly
              />
              {isOpen && (
                <div>
                  <p className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setRole('Farmer'); setIsOpen(false); }}>Farmer</p>
                  <p className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setRole('Officer'); setIsOpen(false); }}>Officer</p>
                  <p className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { setRole('Admin'); setIsOpen(false); }}>Admin</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center pt-2">
              <button
                type="submit"
                className="text-black font-bold p-2 mb-3 w-50 rounded-md bg-green-700 hover:bg-green-800 transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP FORM */}
        {page === 'signup' && (
          <form onSubmit={handleRegister}>
            <p className="text-black text-center text-xl font-bold mb-1">Create Your Account</p>
            <div className="p-4">
              <input
                className="w-full p-2 mb-3 rounded-md bg-white border"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                className="w-full p-2 mb-3 rounded-md bg-white border"
                type="email"
                placeholder="Email"
                value={emailAddr}
                onChange={(e) => setEmailAddr(e.target.value)}
                required
              />
              <input
                className="w-full p-2 mb-3 rounded-md bg-white border"
                type="text"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
              <input
                className="w-full p-2 mb-3 rounded-md bg-white border"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="w-full p-2 rounded-md bg-white border"
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2 pl-4 mb-2">
              <input type="checkbox" id="agree" className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor="agree" className="text-black">I agree to the <span className='text-green-700'>Terms & Conditions</span></label>
            </div>

            <div className="flex items-center justify-center pt-2">
              <input
                className="text-black font-bold p-2 mb-3 w-50 rounded-md bg-green-700 hover:bg-green-800 transition duration-200"
                type="submit"
                value="Create Account"
              />
            </div>

            <div className="flex items-center">
              <hr className="border-t-2 w-25 ml-4" />
              <p className="ml-4 mr-2">Or continue with</p>
              <hr className="border-t-2 w-26 ml-2" />
            </div>
            <div className="flex justify-around pt-2">
              <img className="w-8 h-8" src="/Google_Logo.svg" alt="Google Logo" />
              <img className="w-10 h-10" src="/DigiLocker_Logo.png" alt="DigiLocker Logo" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signupp;
