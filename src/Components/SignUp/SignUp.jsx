import React, { useState } from 'react'
import './SignUp.css';
import { FaUser, FaMobileAlt, FaLock } from 'react-icons/fa';

import userimg from '../../assets/userimg.png'
import passimg from '../../assets/passimg.png'
import mobileimg from '../../assets/mobileimg.jpg'
import axios from 'axios';
const Login = () => {
  const[email,setEmail]=useState("");
  const[name,setName]=useState("");
  const[mobile,setMobile]=useState("");
  const[pass,setPass]=useState("");
  const[adminPass,setAdminPass]=useState("");
  const handleSubmit =() =>{
    
     if(name.length===0){
          alert("User Name is left");
     }
     else if(mobile.length===0){
      alert("Mobile no. is left");
     }
     else if(adminPass.length===0){
      alert("Admin Pass is left");
     }
    else if(pass.length===0){
      alert("Password is left");
     }
    else{
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/createAccount.php`;
       let fData= new FormData();
       fData.append('name',name);
       fData.append('mobile',mobile);
       fData.append('pass',pass);
       fData.append('adminPass',adminPass);
       fData.append('email',email);
       fData.append('adminName',localStorage.getItem('user_name'));
       fData.append('adminMobile',localStorage.getItem('mobile_no'));
       fData.append('teamName',localStorage.getItem('team'));
       
       axios.post(url,fData) .then(response=>alert(response.data)).catch(error=> alert(error));
  
       
    }
  }
  return (
   <>
   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 loginpage">
      <div className="bg-white p-5 rounded-xl shadow-lg w-96 m-[20px] mt-9"> 
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create User</h2>
        <div className='text-xl'>
          {/* User Name Field */}
          <div className="mb-1 relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
              User Name
            </label>
            <span className="absolute left-3 top-10 text-gray-500 text-xl">
              <FaUser />
            </span>
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              type="text"
              id="username"
              className="w-full  text-xl  pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Mobile No. Field */}
          <div className="mb-1 relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="mobile">
              Mobile No.
            </label>
            <span className="absolute left-3 top-10 text-gray-500 text-xl">
              <FaMobileAlt />
            </span>
            <input
            
            value={mobile} onChange={(e) => setMobile(e.target.value)}
              type="tel"
              id="mobile"
              className="w-full  text-xl  text-xl pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your mobile number"
            />
          </div>
            {/*Emial id feild */}
            <div className="mb-1 relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="mobile">
              Email Id
            </label>
            <span className="absolute left-3 top-10 text-gray-500 text-xl">
              <FaMobileAlt />
            </span>
            <input
            
            value={email} onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="mobile"
              className="w-full  text-xl  text-xl pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email id"
            />
          </div>

          {/* Password Field */}
          <div className="mb-1 relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <span className="absolute left-3 top-10 text-gray-500 text-xl">
              <FaLock />
            </span>
            <input
            value={pass} onChange={(e) => setPass(e.target.value)}
              type="password"
              id="password"
              className="w-full  text-xl  pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
           {/*Admin Password Field */}
           <div className="mb-2 relative">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Admin Password
            </label>
            <span className="absolute left-3 top-10 text-gray-500 text-xl">
              <FaLock />
            </span>
            <input
          value={adminPass}onChange={(e) => setAdminPass(e.target.value)}
              type="password"
              id="password"
              className="w-full  text-xl  pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>


          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold"
          >
            Create Account
          </button>

         
        </div>

       
      </div>
    </div>
    </>
  )
}

export default Login
