import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { SiGoogleplay, SiAppstore } from 'react-icons/si';
import { Link } from 'react-router-dom';



const Footer = () => {

  const [teamsnames, setTeams] = useState([]);
  function getTotalTeamsOfAdmin() {

    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getAllTeamOfAdmin.php`;
    let fData2 = new FormData();
    fData2.append('adminname', localStorage.getItem('user_name'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setTeams(APIResponse); // Only Response from API is set in state

    }).catch(error => alert(error, " Try Again...!"));


  }
  const changeTeam=(team)=>{
     window.scrollTo(0, 0);
     console.log("team change");
     console.log(team);
     localStorage.setItem('team',team);
     window.location.reload();
  }
  useEffect(() => {
    getTotalTeamsOfAdmin();
  }, [])

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-5 mt-11 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10  ">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">SJH Foundation</h2>
          <p className="text-gray-400 mb-6">Your trusted partner in financial solutions, helping you reach your dreams with flexible loan options.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Useful Links */}


        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className=" mb-3">Subscribe to our newsletter to get the latest updates on loan rates and financial tips.</p>
          <div className="flex text-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full font-extrabold text-black px-3 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-yellow-500 text-gray-900 font-semibold px-6 rounded-r-lg hover:bg-yellow-600 transition duration-200">
              Subscribe
            </button>
          </div>
        </div>

        {/* Download Our App */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Download Our App</h3>
          <p className="text-gray-400 mb-3">Manage your loans on the go with our mobile app, available on:</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 flex items-center space-x-2">
              <SiGoogleplay size={24} />
              <span>Google Play</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 flex items-center space-x-2">
              <SiAppstore size={24} />
              <span>App Store</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto text-center text-gray-500 mt-10">
        <p>© 2024 MoneyWise. All rights reserved.</p>
      </div>
      <div className='w-[100px] h-[40px] float-right text-lg m-2'>
        <Link onClick={()=> window.scrollTo(0, 0)}  to="/transfertoaadmin" className='w-[100%] h-[100%]  text-center pt-2 float-right'>T-A-Admin</Link>
      </div>
      <div className='w-[100px] h-[40px] float-right text-lg m-2'>
        <Link onClick={()=> window.scrollTo(0, 0)}  to="/adminsetting" className='w-[100%] h-[100%]  text-center pt-2 float-right'>Admin Name</Link>
      </div>
      <div className=''>
      { teamsnames.length-1 && teamsnames.map((item, index) => (
  <button 
    onClick={() => changeTeam(item.team)} // Use an arrow function to pass the parameter
    key={index} 
    className='text-xl text-[red] bg-green-200 p-2 rounded-full ml-5 mr-5 mt-5 font-extrabold'>
      {item.team}
  </button>
))}
  <br /><br /> <br />
      </div>
    </footer>
  );
};

export default Footer;
