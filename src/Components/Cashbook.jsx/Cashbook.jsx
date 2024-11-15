import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import AllAdmin from './AllAdmin';
const Cashbook = () => {

    const [total_amt_cashbook_team,settotal_amt_cashbook_team]=useState(0);
    function getTotalCashATHandAtAllAdmin() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtAllCashbook.php`;
        let fData2 = new FormData();
        fData2.append('team', localStorage.getItem('team'));
        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            settotal_amt_cashbook_team(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));
       
    }




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
    const getTotalCashATHand = (team, admin_name) => {
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
        getTotalCashATHandAtAllAdmin();
    }, [])


    return (
        <div className='overflow-scroll h-fit  mb-[20px] pb-10 deposite-page flex justify-center w-full  bg-gradient-to-r from-violet-200 to-pink-200 p-5'>
            <div className="flex flex-col mt-[150px] items-center justify-center w-full max-w-4xl space-y-6">
                {names.map((item, index) => (
                    <AllAdmin key={index} item={item} />
                ))}


                {/* total cash at hand in all cashbook of team*/}
                <div  className="bg-white shadow-lg rounded-lg p-6 w-full flex flex-col justify-between transform transition-all duration-300 hover:shadow- hover:scale-105 ">

                    <p className="text-gray-600 text-2xl font-extrabold ">Total Cash At All Admin</p>

                    <div className="flex justify-center mt-4">

                        <div className={`${total_amt_cashbook_team < 0 ? 'bg-red-500' : 'bg-green-400'} text-white rounded-md px-4 py-2 text-xl w-[150px] ml-1`}>₹ {total_amt_cashbook_team}</div>
                    </div>



                </div>

            </div>
        </div>

    )
}

export default Cashbook;
