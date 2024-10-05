import React, { useState } from 'react'
import './LoginPage.css'
import userimg from '../../assets/userimg.png'
import passimg from '../../assets/passimg.png'
import mobileimg from '../../assets/mobileimg.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const[name,setName]=useState("");
  const[mobile,setMobile]=useState("");
  const[pass,setPass]=useState("");
  let navigate= useNavigate("");
  const handleSubmit =() =>{
   
     if(name.length===0){
          alert("User Name is left");
     }
     else if(mobile.length===0){
      alert("Mobile no. is left");
     }
   
    else if(pass.length===0){
      alert("Password is left");
     }
    else{
       
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/login.php`;
       let fData= new FormData();
       fData.append('name',name);
       fData.append('mobile',mobile);
       fData.append('pass',pass);
   


       axios.post(url,fData).then((result)=>{
          if(result.data.Status === '200'){
            ///  logout first 
            window.localStorage.removeItem('mobile_no');
            window.localStorage.removeItem('user_name');
            window.localStorage.removeItem('team');
            window.localStorage.removeItem('reload_flag');
          // login other
             window.localStorage.setItem('mobile_no',result.data.mobile_no);
             window.localStorage.setItem('user_name',result.data.user_name);
             window.localStorage.setItem('team',result.data.team);
             window.localStorage.setItem('reload_flag',"1");
             navigate('/dashboard');
          }
          else{
             alert("invalid user check the details..!");

          }
       }).catch(error=> alert(error," Try Again...!"));
       
       
    }
  }
  return (

 <>
   


   <div className='loginpage '>
       <div className="loginBox mt-[100px] ml-[2%] min-w-[350px] w-[600px] p-5">
       <h1 className=' text-orange-600 '>Admin Login</h1>
          <label className="flex  font-bold text-4xl" for=""><img className="w-[60px] h-auto pr-2" src={userimg} alt=""/>Admin Name</label><br/>
          <input className='flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="Enter your name..." type="text"value={name} onChange={(e) => setName(e.target.value)}/><br/>
          <label className="flex font-bold text-4xl" for=""><img src={mobileimg} className="w-[50px] h-auto pr-2" alt=""/>Mobile No.</label><br/>
          <input className='flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="ex. 1234567890"type="text" value={mobile} onChange={(e) => setMobile(e.target.value)}/><br/>
          <label className='flex font-bold text-4xl' for=""><img src={passimg} className="w-[50px] h-auto pr-2" alt=""/>Password</label><br/>
          <input className='flex font-bold text-3xl rounded-full pl-2 mr-2 w-[95%]' placeholder="Password..."type="password"value={pass} onChange={(e) => setPass(e.target.value)}/><br/>
          <button   className="button text-4xl rounded-full w-[50%] ml-[25%] bg-orange-600 pl-2 pr-2 mr-auto mb-[30px]"type="submit" onClick={handleSubmit}>Submit</button>

       </div>
     </div>
 
 </>
  )
}

export default Login
