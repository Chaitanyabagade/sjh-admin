import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Cashinfo = ({team,admin_name,index}) => {

    const [data2, setData2] = useState([]);
 
    const [total_amt, setTotal_amt] = useState(0);
    function  getTotalCashATHand() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
        let fData2 = new FormData();
        fData2.append('team',team);
        fData2.append('admin_name',admin_name);
        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            setTotal_amt(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));

    }

    function getData() {
      
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getCashbooks.php`;
        let fData = new FormData();
        fData.append('team', team);
        fData.append('admin_name', admin_name);
        axios.post(url, fData).then((response) => {

            const APIResponse = response.data;// This is response data from AXIOS
            setData2(APIResponse); // Only Response from API is set in state
            
        }).catch(error => alert(error, " Try Again...!"));


        // get total deposite
        getTotalCashATHand();
       

    }


    useEffect(() => {
        getData();
        getTotalCashATHand();
    }, [])


    return (
        <>
        <h1>CashBook {admin_name} </h1>
        <div className='  overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'>
          
            <table className='w-full font-extrabold'>
                <tr>
                    <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Sr.No.</td>
                    <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>user Name</td>
                    <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Amount</td>
                    <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Note of Transaction</td>
                </tr>

                {data2.map((name, index) => (
                    
                    <tr  key={index}>
                        <td className='p-1 border-2 border-black text-center' style={{ background: 'white' }}>{index + 1}</td>
                        <td className='p-1 border-2 border-black text-' style={{ background: 'white' }}>{name.user_name}</td>
                        <td className={`p-1 border-2 border-black text-right ${name.amount > 0? "text-green-800" :"text-red-800"} `} style={{ background: 'white' }}>{name.amount}</td>
                        <td className='p-1 border-2 border-black text-right' style={{ background: 'white' }}>{name.note}</td>
                    </tr>
                ))}
                <tr >
                    <td colSpan="3" className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Total</td>
                    <td className={`p-1 border-2 border-black text-right  ${total_amt > 0? "text-green-800" :"text-red-800"} `}  style={{ background: 'orange' }}>{total_amt}</td>
                </tr>


            </table>
        </div>
        </>
    )
}

export default Cashinfo
