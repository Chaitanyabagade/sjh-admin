import React, { useEffect, useState } from 'react'
import './penalty.css'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const Penalty = () => {
const [data,setData]=useState([]);



const [names,setNames]=useState([]);

function getTotalNames(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
    setNames(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
 console.log(names);

}


const[penalty_amt,setPen_amt]=useState(0);
function getTotalpenalty(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalpenalty.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setPen_amt(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}
 function getData(){

  const url=`${process.env.REACT_APP_domain}/sjh-team-api/penalty.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {
 
    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));


  // get total deposite
 

}  



const[name,setName]=useState("");
const[amount,setAmount]=useState();
const[note,setNote]=useState("");
const[date,setDate]=useState("");


const handleAddPenalty =() =>{
   console.log(name,amount);
   if(name.length===0){
        alert("User Name is left");
   }   
  else if(amount.length===0){
    alert("Amount is left");
   }
   else if(note.length===0){
    alert("note is left");
   }
   else if(date.length===0){
    alert("date is left");
   }
  else{
     const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_penalty.php`;
     let fData= new FormData();
     fData.append('name',name);
     fData.append('amount',amount);
     fData.append('date',date);
     fData.append('note',note);
     fData.append('team',localStorage.getItem('team'));

     axios.post(url,fData).then((result)=>{
      getData();
      getTotalpenalty();
     })
     .catch(error=> alert(error," Try Again...!"));
    
    }


  }


useEffect(()=>{
  getData();
  getTotalpenalty();
  getTotalNames();
},[])



  return (
    <div className=' pt-[100px] deposite-page bg-gradient-to-r from-violet-200 to-pink-200 '>
 
<div className="flex items-center m-[20px] justify-center h-fit  ">
        <form className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Penalty</h2>

          {/* Select Field 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">User Name</label>
            <select value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
              <option>User Name...</option>
              {names.map((name, index) => (
                <option >{name.user_name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
            <input placeholder='Enter Amount..' value={amount} onChange={(e) => setAmount(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Date</label>
            <input placeholder='Enter Date..' value={date} onChange={(e) => setDate(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Note</label>
            <input placeholder='Enter Note..' value={note} onChange={(e) => setNote(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />

          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddPenalty}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane className="mr-2" />
            Submit
          </button>
        </form>
      </div>


        <h2 className='mt-9 text-3xl text-center w-[300px] rounded-full text-green-700 font-bold p-2 ml-auto mr-auto'> All Users Penalty </h2>
       
        <div className='overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'> 
        <table className='w-full mb-9'>
              
                <tr className='border-2 border-black'> 
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Sr.No.</td>
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>user Name</td>
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Date</td>       
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Note</td>  
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Penalty</td>          
                </tr>
               
                {data.map((item,index) => (
                 
                 <tr> 
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{index+1}</td>
                 <td className='p-1 border-2 border-black' style={{background:'white'}}>{item.user_name}</td>
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{item.Date}</td>   
                 <td className='p-1 border-2 border-black' style={{background:'white'}}>{item.note}</td>  
                 <td className='p-1 border-2 border-black text-right pr-2' style={{background:'white'}}>{item.penalty}</td>              
             </tr>
      ))}
               <tr> 
                    <td className='p-1 border-2 border-black text-center' colSpan="4"style={{background:'orange'}}>Total</td>
                
                    <td className='p-1 border-2 border-black text-right pr-2'  style={{background:'orange'}}>{penalty_amt}</td>             
                </tr>
           
           
        </table>
        </div>
     
      </div> 
   
  )
}

export default Penalty
