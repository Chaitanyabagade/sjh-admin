import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import AllAdmin from './AllAdmin';
const Cashbook = () => {


    const [names, setNames] = useState([]);
    function getTotalAdminNames() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
        let fData2 = new FormData();
        fData2.append('name', localStorage.getItem('team'));

        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            setNames(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));


    }

    ///// get the total balance of admin//////////////
    const [data2, setData2] = useState([]);
    const [total_amt, setTotal_amt] = useState(0);
    const getTotalCashATHand = (team,admin_name)=> {
       console.log("data feched")
        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
        let fData2 = new FormData();
        fData2.append('team', team);
        fData2.append('admin_name', admin_name);
        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            setTotal_amt(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));

    }

    //////////////////////// end of admin balance /////////////////////////////////

    useEffect(() => {
        getTotalAdminNames();
    }, [])


    return (
        <div className='overflow-scroll h-fit  mb-[20px] pb-10 deposite-page flex justify-center w-full  bg-gradient-to-r from-violet-200 to-pink-200 p-5'>
        <div className="flex flex-col mt-[150px] items-center justify-center w-full max-w-4xl space-y-6">
          {names.map((item, index) => (
               <AllAdmin key={index} item={item}/>
          ))}
        </div>
      </div>
      
    )
}

export default Cashbook;
