import React, { useEffect, useState } from 'react'

import axios from 'axios';
const Deposites = () => {
const [data,setData]=useState([]);



const[dep_amt,setDep_amt]=useState(0);
function getTotalDeposite(){
  
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalDeposite.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));

  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setDep_amt(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}
 function getData(){

  const url=`${process.env.REACT_APP_domain}/sjh-team-api/deposite2.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {

    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));


  // get total deposite
  getTotalDeposite();

}  


useEffect(()=>{
  getData();
},[])



  const[name,setName]=useState("");
  const[amount,setAmount]=useState();
  


  const handleAddDeposite =() =>{
     console.log(name,amount);
     if(name.length===0){
          alert("User Name is left");
     }   
    else if(amount.length===0){
      alert("Amount is left");
     }
    else{
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_deposite.php`;
       let fData= new FormData();
       fData.append('name',name);
       fData.append('amount',amount);
       fData.append('team',localStorage.getItem('team'));

       axios.post(url,fData).then((result)=>{
        getData();
       })
       .catch(error=> alert(error," Try Again...!"));
      
      }


    }
  return (
    <div className='deposite-page justify-center w-[100%] h-[100vh] bg-yellow-300'>
        <h1 className='depositeName'> All Users Deposites Table </h1>
        <div className='add-deposite border-[5px] border-gray-800'>
              <h1 className='text-4xl font-bold text-orange-600 items-center' >Add Deposite</h1>
             <br />
              <select className='border-2 border-purple-500  selectloan' type='text'placeholder='user name..' value={name} onChange={(e) => setName(e.target.value)} >
               <option>User Name...</option>
              {data.map((name,index) => (
                 <option >{name.user_name}</option>
              ))}
              </select><br></br><br></br>
              <select className='border-2 border-purple-500  selectloan'type="number" placeholder='Select the amount..' value={amount} onChange={(e) => setAmount(e.target.value)}>
                  <option>Select Amt...</option>  
                  <option> 300</option>
                  <option> 500</option>
                  <option>-300</option>
                  <option>-500</option>
                  
              </select><br/>
              <button className='button text-4xl bg-blue-600 rounded-full w-[32%] ml-[34%] m-5' onClick={handleAddDeposite}>Add</button>
        </div>
      
        <div className=' overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'> 
        <table className='w-full mb-9'>
                <tr> 
                    <td className='p-1 border-2 border-black text-center'style={{background:'orange'}}>Sr.No.</td>
                    <td className='p-1 border-2 border-black text-center'style={{background:'orange'}}>user Name</td>
                    <td className='p-1 border-2 border-black text-center'style={{background:'orange'}}>Deposite</td>             
                </tr>
               
                {data.map((name,index) => (
                 
                 <tr> 
                 <td className='p-1 border-2 border-black text-center'style={{background:'white'}}>{index+1}</td>
                 <td className='p-1 border-2 border-black text-'style={{background:'white'}}>{name.user_name}</td>
                 <td className='p-1 border-2 border-black text-right'style={{background:'white'}}>{name.deposite}</td>             
             </tr>
      ))}
               <tr> 
                    <td colSpan="2"className='p-1 border-2 border-black text-center'style={{background:'orange'}}>Total</td>
                    <td className='p-1 border-2 border-black text-right'style={{background:'orange'}}>{dep_amt}</td>             
                </tr>
           
           
        </table>
      </div> 
    </div>
  )
}

export default Deposites
