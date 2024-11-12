import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Cashinfo = () => {

    const [data2, setData2] = useState([]);

    const [total_amt, setTotal_amt] = useState(0);
    function getTotalCashATHand() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
        let fData2 = new FormData();
        fData2.append('team', localStorage.getItem('team'));
        fData2.append('admin_name', localStorage.getItem('cashatadmin_name'));
        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            setTotal_amt(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));

    }

    function getData() {

        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getCashbooks.php`;
        let fData = new FormData();
        fData.append('team', localStorage.getItem('team'));
        fData.append('admin_name', localStorage.getItem('cashatadmin_name'));
        axios.post(url, fData).then((response) => {

            const APIResponse = response.data;// This is response data from AXIOS
            setData2(APIResponse); // Only Response from API is set in state

        }).catch(error => alert(error, " Try Again...!"));


        getTotalCashATHand();


    }


    useEffect(() => {
        getData();
        getTotalCashATHand();
    }, [])


    return (
        <>

<div className='min-h-screen bg-gradient-to-b from-orange-500 to-purple-500 py-10 px-4'>
  
    <h1 className=' mt-[100px] text-center text-4xl font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto p-2 w-fit rounded-lg shadow-lg'>
        CashBook of {localStorage.getItem('cashatadmin_name')}
    </h1>

   
    <div className='mt-6 flex justify-center'>
        <Link 
            to="../cashbook" 
            className='bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium px-5 py-3 rounded-lg shadow transition-transform transform hover:scale-105'>
            {'⬅ Back'}
        </Link>
    </div>

  
    <div className='overflow-x-auto mt-10 mx-auto bg-white shadow-lg rounded-lg w-full max-w-5xl'>
        <table className='min-w-full table-auto border-collapse'>
            <thead>
                <tr>
                    <th className='px-4 py-3 bg-indigo-600 text-white font-semibold text-sm uppercase tracking-wider border border-gray-200'>Sr. No.</th>
                    <th className='px-4 py-3 bg-indigo-600 text-white font-semibold text-sm uppercase tracking-wider border border-gray-200'>Amount</th>
                    <th className='px-4 py-3 bg-indigo-600 text-white font-semibold text-sm uppercase tracking-wider border border-gray-200'>Note of Transaction</th>
                    <th className='px-4 py-3 bg-indigo-600 text-white font-semibold text-sm uppercase tracking-wider border border-gray-200'>Date (yyyy-mm-dd)</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {data2.map((transaction, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                        <td className='px-4 py-3 text-center'>{index + 1}</td>
                        <td className={`px-4 py-3 text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>{transaction.amount}</td>
                        <td className='px-4 py-3'>{transaction.note}</td>
                        <td className='px-4 py-3'>{transaction.last_paid_date}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3" className='px-4 py-3 text-center bg-indigo-500 text-white font-bold text-2xl'>Total</td>
                    <td className={` text-2xl px-4 py-3 text-right  font-bold  ${total_amt > 0 ? 'text-green-600' : 'text-red-600'}`}>{total_amt}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

        </>
    )
}

export default Cashinfo
