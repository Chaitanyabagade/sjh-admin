import React, { useState } from 'react'
import './SignUp.css';
import userimg from '../../assets/userimg.png'
import passimg from '../../assets/passimg.png'
import mobileimg from '../../assets/mobileimg.jpg'
import axios from 'axios';
const Login = () => {

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
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/createAccount.php`;
       let fData= new FormData();
       fData.append('name',name);
       fData.append('mobile',mobile);
       fData.append('pass',pass);
       fData.append('adminPass',adminPass);

       axios.post(url,fData) .then(response=>alert(response.data)).catch(error=> alert(error));
  
       
    }
  }
  return (
    <div className='loginpage'>
       <div className="loginBox mt-[100px] ml-[2%] min-w-[350px] w-[600px] p-5 ">
       <h1>Create User</h1>
          <label className='flex  font-bold text-4xl'><img className="w-[60px] h-auto pr-2" src={userimg} alt="" />User Name</label>
          <input  className=' mt-2 flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="Enter your name..." type="text"name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label className="  mt-2 flex  font-bold text-4xl" htmlFor=''><img  className="w-[50px] h-auto pr-2" src={mobileimg} /> Mobile No.</label>
          <input  className='  flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="ex. 1234567890"type="text"name="mobile"value={mobile}onChange={(e) => setMobile(e.target.value)}/>
          <label className=" mt-2 flex  font-bold text-4xl"htmlFor=''><img className="w-[50px] h-auto pr-2" src={passimg} alt=""/>Admin Pass</label>
          <input  className='flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="Admin Password..."type="password" value={adminPass}onChange={(e) => setAdminPass(e.target.value)}/>
          <label className=" mt-2 flex  font-bold text-4xl" htmlFor=''><img className="w-[50px] h-auto pr-2" src={passimg} alt=""/>Password</label>
          <input  className='flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="Admin Password..."type="password"name="pass"value={pass}onChange={(e) => setPass(e.target.value)}/>
          <button  className=" mt-3 text-4xl text-center w-[44%] ml-[28%] rounded-full bg-blue-600"type="submit" onClick={handleSubmit}>Submit</button>
         

       </div>
    </div>
  )
}

export default Login
