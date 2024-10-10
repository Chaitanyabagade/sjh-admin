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
    <div className='deposite-page pt-[100px] bg-gradient-to-r from-violet-200 to-pink-200 '>

  <div className="flex m-[20px] items-center justify-center h-fit   ">
        <form className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Expendature</h2>

          {/* Select Field 1 */}
        
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
            onClick={handleAddExpendature}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane className="mr-2" />
            Submit
          </button>
        </form>
      </div>
        <h2 className='mt-9 text-3xl text-center w-[300px] rounded-full bg-orange-600 p-2 ml-auto mr-auto'> Expendatures</h2>
       
        <div className='overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'> 
        <table className='w-full mb-9'>
              
                <tr className='border-2 border-black'> 
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Sr.No.</td>
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Date</td>       
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Note</td>  
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Expendature</td>          
                </tr>
               
                {data.map((item,index) => (
                 
                 <tr> 
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{index+1}</td>
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{item.Date}</td>   
                 <td className='p-1 border-2 border-black' style={{background:'white'}}>{item.note}</td>  
                 <td className='p-1 border-2 border-black text-right pr-2' style={{background:'white'}}>{item.expendature}</td>              
             </tr>
      ))}
               <tr> 
                    <td className='p-1 border-2 border-black text-center' colSpan="3"style={{background:'orange'}}>Total</td>
                
                    <td className='p-1 border-2 border-black text-right pr-2'  style={{background:'orange'}}>{Expendature_amt}</td>             
                </tr>
           
           
        </table>
        </div>
     
      </div> 
   
  )
}

export default Expendature
