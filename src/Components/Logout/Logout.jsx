import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
      var navigate= useNavigate(""); 
      function logout(){
        if(window.confirm("Do you want to Logout?")){
           localStorage.removeItem("mobile_no");
           localStorage.removeItem("user_name");  
           localStorage.removeItem("team"); 
           navigate("/");
           localStorage.setItem('reload_flag',1);
        }

        else{
         navigate("/dashboard")
        }
      }
       
      useEffect(()=>{
         logout();
      },[]);
    
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Nature Image */}
      <img
        src="https://source.unsplash.com/1600x900/?nature,forest,mountains"
        alt="Nature scenery"
        className="w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Embrace the Beauty of Nature</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Experience the serene landscapes, towering mountains, and lush forests that nature has to offer. Step outside, breathe deeply, and reconnect with the world around you.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Logout
