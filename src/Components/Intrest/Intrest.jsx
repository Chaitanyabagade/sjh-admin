import React, { useEffect, useState } from 'react'
import './Intrest.css'
import axios from 'axios';
const Intrest = () => {
const [data,setData]=useState([]);

const[intrest_amt,setInt_amt]=useState(0);

const [names,setNames]=useState([]);

function getTotalNames(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
    setNames(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
 

}

function getTotalIntrest(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalIntrest.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  
  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setInt_amt(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}
 function getData(){

  const url=`${process.env.REACT_APP_domain}/sjh-team-api/intrest.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {

    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));


  // get total deposite
 

}  


useEffect(()=>{
  getData();
  getTotalIntrest();
  getTotalNames();
},[])


const[name,setName]=useState("");
const[amount,setAmount]=useState();
const[note,setNote]=useState("");
const[date,setDate]=useState("");


const handleAddIntrest =() =>{
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
     const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_intrest.php`;
     let fData= new FormData();
     fData.append('name',name);
     fData.append('amount',amount);
     fData.append('date',date);
     fData.append('note',note);
     fData.append('team',localStorage.getItem('team'));

     axios.post(url,fData).then((result)=>{
      getData();
      getTotalIntrest();
     })
     .catch(error=> alert(error," Try Again...!"));
    
    }


  }

  return (
    <div className='deposite-page'>
       <div className='add-deposite border-[5px] border-gray-800'>
              <h1 className='text-4xl font-bold text-orange-600 items-center' >Add Intrest</h1>
               
              <select className='mb-5 border-2 border-purple-500  selectloan' type='text'placeholder='user name..' value={name} onChange={(e) => setName(e.target.value)} >
               <option>Select The User Name...</option>
              {names.map((name,index) => (
                 <option >{name.user_name}</option>
              ))}
              </select>
              <input className='mb-5  text-3xl border-2 border-purple-500  selectloan'type="number" placeholder='amount..' value={amount} onChange={(e) => setAmount(e.target.value)}>
              </input>
               <br />
              <input className='mb-5 text-3xl  border-2 border-purple-500  selectloan'type="text" placeholder='Date..' value={date} onChange={(e) => setDate(e.target.value)}>
              </input>
              <input className='mb-5 text-3xl  border-2 border-purple-500  selectloan'type="text" placeholder='Note..' value={note} onChange={(e) => setNote(e.target.value)}>
              </input>
              <button className='mb-5 text-3xl  button text-4xl bg-blue-600 rounded-full w-[32%] ml-[34%] m-5' onClick={handleAddIntrest}>Add</button>
        </div>


        <h2 className='mt-9 text-3xl text-center w-[300px] rounded-full bg-orange-600 p-2 ml-auto mr-auto'> All Users <br /> Intrest Table </h2>
       
        <div className=' overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'> 
        <table className='w-full mb-9'>
              
                <tr className='border-2 border-black'> 
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Sr.No.</td>
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>user Name</td>
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Date</td>       
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Note</td>  
                    <td className='p-1 border-2 border-black text-center' style={{background:'orange'}}>Intrest</td>          
                </tr>
               
                {data.map((item,index) => (
                 
                 <tr> 
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{index+1}</td>
                 <td className='p-1 border-2 border-black' style={{background:'white'}}>{item.user_name}</td>
                 <td className='p-1 border-2 border-black text-center' style={{background:'white'}}>{item.Date}</td>   
                 <td className='p-1 border-2 border-black' style={{background:'white'}}>{item.note}</td>  
                 <td className='p-1 border-2 border-black text-right pr-2' style={{background:'white'}}>{item.intrest}</td>              
             </tr>
      ))}
               <tr> 
                    <td className='p-1 border-2 border-black text-center' colSpan="4"style={{background:'orange'}}>Total</td>
                
                    <td className='p-1 border-2 border-black text-right pr-2'  style={{background:'orange'}}>{intrest_amt}</td>             
                </tr>
           
           
        </table>
        </div>
     
      </div> 
    
  )
}

export default Intrest
