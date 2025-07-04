import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const Expendature = () => {
const [data,setData]=useState([]);



const[Expendature_amt,setPen_amt]=useState(0);
function getTotalExpendature(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalExpendature.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setPen_amt(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}
 function getData(){

  const url=`${process.env.REACT_APP_domain}/sjh-team-api/expendature.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {
 
    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));


  // get total deposite
 

}  


const[amount,setAmount]=useState();
const[note,setNote]=useState("");
const[date,setDate]=useState("");


const handleAddExpendature =() =>{
   if(amount.length===0){
    alert("Amount is left");
   }
   else if(note.length===0){
    alert("note is left");
   }
   else if(date.length===0){
    alert("date is left");
   }
  else{
     const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_Expendature.php`;
     let fData= new FormData();
     fData.append('amount',amount);
     fData.append('date',date);
     fData.append('note',note);
     fData.append('team',localStorage.getItem('team'));
     fData.append('mobile_no', localStorage.getItem('mobile_no'));
     fData.append('admin_name', localStorage.getItem('user_name'));
     axios.post(url,fData).then((result)=>{
      getData();
      getTotalExpendature();
     })
     .catch(error=> alert(error," Try Again...!"));
    
    }
    getData();
    getTotalExpendature();


  }


useEffect(()=>{
  getData();
  getTotalExpendature();
 
},[])



  return (
    
    <div className='deposite-page pt-[100px] bg-gradient-to-r from-teal-400 to-pink-500'>
    {/* Form Section */}
    <div className="flex m-5 items-center justify-center h-fit">
      <form className="text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Expenditure</h2>
  
        {/* Amount Input Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
          <input
            type="number"
            placeholder='Enter Amount...'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>
  
        {/* Date Input Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>
  
        {/* Note Input Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Note</label>
          <input
            type="text"
            placeholder='Enter Note...'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="button"
          onClick={handleAddExpendature}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
        >
          <FaPaperPlane className="mr-2" />
          Submit
        </button>
      </form>
    </div>
  
    {/* Expenditures Header */}
    <h2 className='mt-9 text-3xl text-center w-full font-sans text-teal-800'>Expenditures</h2>
  
    {/* Expenditure Table */}
    <div className='overflow-x-scroll text-base sm:text-xl md:text-2xl lg:text-3xl mx-auto mt-5 bg-white shadow-lg rounded-lg'>
      <table className='w-full border border-gray-300'>
        <thead>
          <tr className='border-b border-gray-300 bg-orange-500 text-white'>
            <th className='p-2 text-center'>Sr.No.</th>
            <th className='p-2 text-center'>Date</th>
            <th className='p-2 text-center'>Note</th>
            <th className='p-2 text-center'>Expenditure</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='hover:bg-gray-100 border-b border-gray-300'>
              <td className='p-2 text-center'>{index + 1}</td>
              <td className='p-2 text-center'>{item.Date}</td>
              <td className='p-2'>{item.note}</td>
              <td className='p-2 text-right pr-2'>{item.expendature}</td>
            </tr>
          ))}
          <tr className='bg-orange-500 text-white'>
            <td className='p-2 text-center' colSpan="3">Total</td>
            <td className='p-2 text-right pr-2'>{Expendature_amt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  )
}

export default Expendature
