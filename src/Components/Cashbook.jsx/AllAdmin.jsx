import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const AllAdmin = ({item}) => {
    const [data2, setData2] = useState([]);

    const [total_amt, setTotal_amt] = useState(0);
    function getTotalCashATHand() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
        let fData2 = new FormData();
        fData2.append('team', item.team);
        fData2.append('admin_name',item.admin_name);
        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            setTotal_amt(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));
        return total_amt;
    }

    function getData() {

        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getCashbooks.php`;
        let fData = new FormData();
        fData.append('team', item.team);
        fData.append('admin_name', item.admin_name);
        axios.post(url, fData).then((response) => {

            const APIResponse = response.data;// This is response data from AXIOS
            setData2(APIResponse); // Only Response from API is set in state
           

        }).catch(error => alert(error, " Try Again...!"));


        // get total deposite
        getTotalCashATHand();


    }

   

useEffect(()=>{
    getData();
},[]);

    return (
        <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 w-full flex flex-col justify-between transform transition-all duration-300 hover:shadow- hover:scale-105 ">
           
            <p className="text-gray-600 text-2xl font-extrabold ">Admin: {item.admin_name}</p>
         
            <div className="flex justify-between mt-4">
                
                <Link to='cashinfo' onClick={()=>{localStorage.setItem('cashatadmin_name',item.admin_name)}} className="pt-auto w pt-3 bg-blue-500 text-white rounded-md px-4 py-2   font-bold  hover:bg-blue-600 transition duration-300">View Details</Link>
                
                <div className={`${total_amt<0?'bg-red-500':'bg-green-400'} text-white rounded-md px-4 py-2 text-xl w-[150px] ml-1`}>₹ {getTotalCashATHand(item.team, item.admin_name)}</div>
            </div>
          
          
                
        </div>
    )
}

export default AllAdmin
