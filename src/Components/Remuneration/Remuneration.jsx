import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const Remuneration = () => {
const [data,setData]=useState([]);



const[Remuneration_amt,setRemu_am]=useState(0);
function getTotalRemuneration(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalRemuneration.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
    setRemu_am(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}
 function getData(){

  const url=`${process.env.REACT_APP_domain}/sjh-team-api/remuneration.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {
 
    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));


  // get total renumaration
 

}  


const[amount,setAmount]=useState();
const[note,setNote]=useState("");
const[date,setDate]=useState("");


const handleAddRemuneration =() =>{
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
     const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_Remuneration.php`;
     let fData= new FormData();
     fData.append('amount',amount);
     fData.append('date',date);
     fData.append('note',note);
     fData.append('team',localStorage.getItem('team'));
     fData.append('mobile_no', localStorage.getItem('mobile_no'));
     fData.append('admin_name', localStorage.getItem('user_name'));
     axios.post(url,fData).then((result)=>{

      if(result.status==200){
         alert("Sucessfulyy added ..");
      }
      else{
         alert(result.data);
      }

      getData();
      getTotalRemuneration();
     })
     .catch(error=> alert(error," Try Again...!"));
    
    }
    getData();
    getTotalRemuneration();

  }


useEffect(()=>{
   getData();
   getTotalRemuneration();
},[])



  return (
    <div className='deposite-page pt-[100px] bg-gradient-to-r from-blue-200 to-green-200'>
    <div className="flex m-[20px] items-center justify-center h-fit">
      <form className="text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Remuneration</h2>
  
        {/* Amount Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
          <input
            placeholder='Enter Amount..'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
          />
        </div>
  
        {/* Date Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
          <input
            placeholder='Enter Date..'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
          />
        </div>
  
        {/* Note Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Note</label>
          <input
            placeholder='Enter Note..'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
          />
        </div>
  
        {/* Submit Button */}
        <button
          onClick={handleAddRemuneration}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
        >
          <FaPaperPlane className="mr-2" />
          Submit
        </button>
      </form>
    </div>
  
    <h2 className='mt-9 text-3xl text-center w-[300px] rounded-full bg-orange-600 p-2 mx-auto'>Remunerations</h2>
  
    <div className='overflow-x-auto text-[15px] sm:text-2xl md:text-3xl lg:text-4xl mx-auto mt-5 bg-white shadow-md rounded-lg'> 
      <table className='w-full mb-9'>
        <thead>
          <tr className='bg-orange-500 text-white'>
            <th className='p-2 text-center'>Sr.No.</th>
            <th className='p-2 text-center'>Date</th>       
            <th className='p-2 text-center'>Note</th>  
            <th className='p-2 text-center'>Remuneration</th>          
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='hover:bg-gray-100'>
              <td className='p-2 border-b border-gray-300 text-center'>{index + 1}</td>
              <td className='p-2 border-b border-gray-300 text-center'>{item.Date}</td>   
              <td className='p-2 border-b border-gray-300'>{item.note}</td>  
              <td className='p-2 border-b border-gray-300 text-right'>{item.remuneration}</td>              
            </tr>
          ))}
          <tr className='bg-orange-500 text-white'> 
            <td className='p-2 text-center' colSpan="3">Total</td>
            <td className='p-2 text-right'>{Remuneration_amt}</td>             
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  )
}

export default Remuneration
