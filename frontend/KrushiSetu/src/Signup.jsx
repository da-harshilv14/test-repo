import React, { use, useState } from 'react';
import axios from "axios";
import './Signup.css';

function Signup() {
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

  const [formData, setFormData] = useState({
    full_name: "",
    mobile_email: "",
    aadhaar_number: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", formData);
      alert("Account created successfully!");
    } catch (err) {
      console.error(err.response.data);
      alert("Error creating account");
    }
  };
  return (
    <div className="bg-green-300 h-screen flex items-center justify-center">
      <div className="bg-gray-50 w-full max-w-sm p-8 pb-4 rounded-lg">
        <div className="bg-gray-500 p-1 rounded-md mb-4 flex justify-between items-center">
          <button
            className={`text-black font-bold w-[50%] ${page === 'login' ? 'bg-green-700 text-white rounded-md' : ''}`}
            onClick={() => handlePageSwitch('login')}
          >Login</button>
          <button
            className={`text-black font-bold w-[50%] ${page === 'signup' ? 'bg-green-700 text-white rounded-md' : ''}`}
            onClick={() => handlePageSwitch('signup')}
          >Sign Up</button>
        </div>

        {page === 'login' && (
          <div>
            <p className="text-black text-center text-xl font-bold mb-1">Welcome back!</p>
            <input className="w-full p-2 mb-3 rounded-md bg-white border" type="text" placeholder="Mobile Number / Email" required />
            <input className="w-full p-2 mb-3 rounded-md bg-white border" type="password" placeholder="Password" required />
            <div>

              <div className="relative w-full">
                <input
                  className="w-full p-2 pr-12 mb-3 rounded-md bg-white border"
                  type="text"
                  placeholder="Role"
                  value={role}
                  onClick={handleClick}
                  readOnly
                />
                <img
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pb-2"
                  src="/Dropdown_Logo.svg"
                  alt="Dropdown"
                  onClick={handleClick}
                />
              </div>
              {isOpen && (
                <div>
                  <p className="p-2 cursr-pointer hover:bg-gray-200" onClick={() => handleRoleSelect('Farmer')}>Farmer</p>
                  <p className="p-2 cursr-pointer hover:bg-gray-200" onClick={() => handleRoleSelect('Officer')}>Officer</p>
                  <p className="p-2 cursr-pointer hover:bg-gray-200" onClick={() => handleRoleSelect('Admin')}>Admin</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center pt-2">
              <input className="text-black font-bold p-2 mb-3 w-50 rounded-md bg-green-700 hover:bg-green-800 transition duration-200" type="submit" value="Log In" />
            </div>
            <div className="flex items-center">
              <hr className="border-t-2 w-15 ml-4" />
              <p className="ml-4 mr-2">Or continue with</p>
              <hr className="border-t-2 w-17 ml-2" />
            </div>
            <div className="flex justify-around pt-2 pl-25 pr-25">
              <img className="w-8 h-8" src="../public/Google_Logo.svg" alt="Google Logo" />
              <img className="w-10 h-10" src="../public/DigiLocker_Logo.png" alt="DigiLocker Logo" />
            </div>
          </div>
        )}

        {page === 'signup' && (
          <div>
            <p className="text-black text-center text-xl font-bold mb-1">Create Your Account</p>
            <div className="p-4">
              <input className="w-full p-2 mb-3 rounded-md bg-white border" type="text" placeholder="Full Name" required />
              <input className="w-full p-2 mb-3 rounded-md bg-white border" type="text" placeholder="Mobile Number / Email" required />
              <input className="w-full p-2 mb-3 rounded-md bg-white border" type="text" placeholder="Aadhaar Number (Optional)" />
              <input className="w-full p-2 mb-3 rounded-md bg-white border" type="password" placeholder="Password" required />
              <input className="w-full p-2 rounded-md bg-white border" type="password" placeholder="Confirm Password" required />
              {/* <input type="checkbox" id="agree" className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-500" /> */}
            </div>
            <div className="flex items-center space-x-2 pl-4 mb-2">
              <input type="checkbox" id="agree" className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor="agree" className="text-black">I agree to the <span className='text-green-700'>Terms & Conditions</span></label>
            </div>
            <div className="flex items-center justify-center pt-2">
              <input className="text-black font-bold p-2 mb-3 w-50 rounded-md bg-green-700 hover:bg-green-800 transition duration-200" type="submit" value="Create Account" />
            </div>
            <div className="flex items-center">
              <hr className="border-t-2 w-25 ml-4" />
              <p className="ml-4 mr-2">Or continue with</p>
              <hr className="border-t-2 w-26 ml-2" />
            </div>
            <div className="flex justify-around pt-2 pl-25 pr-25">
              <img className="w-8 h-8" src="../public/Google_Logo.svg" alt="Google Logo" />
              <img className="w-10 h-10" src="../public/DigiLocker_Logo.png" alt="DigiLocker Logo" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
