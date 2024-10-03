import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
      var navigate= useNavigate(""); 
      function logout(){
        if(window.confirm("Do you want to Logout?")){
           localStorage.removeItem("mobile_no");
           localStorage.removeItem("user_name");  
           localStorage.removeItem("team"); 
           
          
        }

        else{
         navigate("/dashboard")
        }
      }
       
      useEffect(()=>{
         logout();
      },[]);
    
  return (
    <div>
       
    </div>
  )
}

export default Logout
