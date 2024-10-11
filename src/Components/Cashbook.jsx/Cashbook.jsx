import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import Cashinfo from './Cashinfo';
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

    useEffect(() => {
        getTotalAdminNames();
    }, [])


    return (
        <div className='overflow-scroll deposite-page justify-center w-[100%] h-[100vh] bg-gradient-to-r pt-[50px]  from-violet-200 to-pink-200'>

            <div className="items-center justify-center h-fit  m-[20px] ">

                {
                    names.map((item, index) => (
                        <Cashinfo key={index} team={item.team} admin_name={item.admin_name} />
                    ))
                }

            </div>
        </div>
    )
}

export default Cashbook;
