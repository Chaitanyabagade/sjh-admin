import React, { useEffect, useState } from 'react'

import axios from 'axios';
const Loan = () => {

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
 

}

const[loan_amt_returned,setloan_amt_returned]=useState(0);
function getTotalLoanReturned(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoanReturned.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));

  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setloan_amt_returned(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}


const[loan_amt,setloan_amt]=useState(0);
function getTotalLoan(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoan.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));

  axios.post(url2,fData2).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
  setloan_amt(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));

}


 function getData(){
  const url=`${process.env.REACT_APP_domain}/sjh-team-api/user_loan.php`;
  let fData= new FormData();
  fData.append('name',localStorage.getItem('team'));

  axios.post(url,fData).then((response) => {

    const APIResponse = response.data;// This is response data from AXIOS
    setData(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}  
useEffect(()=>{
  getData();
  getTotalLoanReturned();
  getTotalLoan();
  getTotalNames();
},[])



  const[name,setName]=useState("");
  const[amount,setAmount]=useState();
  const[loanType,setLoanType]=useState("EMI");
  const[getDate,setGetDate]=useState("");
  const[rDate,setRDate]=useState("");
  
  const handleAddLoan =() =>{
     console.log(name,amount);
     if(name.length===0){
          alert("User Name is left");
     }   
    else if(amount.length===0){
      alert("Amount is left");
     }
     else if(getDate.length===0){
      alert("get date is left");
     }
     else if(rDate.length===0){
      alert("return date is left");
     }
     else if(loanType.length===0){
      alert("loan type is left");
     }
    else{
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/add_loan.php`;
       let fData= new FormData();
       fData.append('name',name);
       fData.append('amount',amount);
       fData.append('get_date',getDate);
       fData.append('r_date',rDate);
       fData.append('loan_type',loanType);
       fData.append('team',localStorage.getItem('team'));

       axios.post(url,fData).then((result)=>{
          if(result.data===1){
            getData();
            getTotalLoan();
            getTotalLoanReturned();
          }
       })
       .catch(error=> alert(error," Try Again...!"));
      }
    }


  const[id,setId]=useState();
  const[name2,setName2]=useState("");
  const[loan_status,setLoanStatus]=useState("Get");
  
  const handleEditLoan =() =>{
    
     if(name2.length===0){
          alert("User Name is left");
     }   
     else if(id.length===0){
      alert("loan id is left");
     }
     else if(loan_status.length===0){
      alert("loan status is left");
     }
    else{
       const url=`${process.env.REACT_APP_domain}/sjh-team-api/admin/edit_loan.php`;
       let fData= new FormData();
       fData.append('name',name2);
       fData.append('id',id);
       fData.append('status',loan_status);
       fData.append('team',localStorage.getItem('team'));

       axios.post(url,fData).then((result)=>{
          if(result.data===1){
             getData();
             getTotalLoan();
            getTotalLoanReturned();
          }
       })
       .catch(error=> alert(error," Try Again...!"));
      }
    }
  return (
    <div className='deposite-page'>
        <div className='md:flex md:mt-[50px]'>
        <div className='add-deposite border-[5px] border-gray-800 '>
              <h1 className='text-4xl font-bold  text-center text-orange-600' >Add Loan</h1>
              <select className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600' type='text'placeholder='user name..' value={name} onChange={(e) => setName(e.target.value)} >
               <option>Select The User Name...</option>
              {names.map((name,index) => (
                 <option >{name.user_name}</option>
              ))}
              </select> <input className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600 'type="number" placeholder='Enter the amount..' value={amount} onChange={(e) => setAmount(e.target.value)}/>
              <input className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600' type='text'placeholder='Enter the get date..' value={getDate} onChange={(e) => setGetDate(e.target.value)} />
              <input className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600 'type="text" placeholder='Enter the return date..' value={rDate} onChange={(e) => setRDate(e.target.value)}/>
              <select className=' w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600 'type="text"  value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                  <option>EMI</option>
                  <option>EDI</option>
                  <option>EFI</option>
              </select>
              <button className='button text-4xl bg-blue-600 rounded-full w-[32%] ml-[34%] m-5' onClick={handleAddLoan}>Add</button>
        </div>
        <div className='add-deposite border-[5px] border-gray-800'>
              <h1 className='text-orange-600 text-4xl font-bold' >Edit Loan Status</h1>
              <select className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600' type='text'placeholder='user name..' value={name2} onChange={(e) => setName2(e.target.value)} >
               <option>Select The User Name...</option>
              {names.map((name,index) => (
                 <option >{name.user_name}</option>
              ))}
              </select>
              <input className=' w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600'type="number" placeholder='Enter the loan id..' value={id} onChange={(e) => setId(e.target.value)}/>
             
              <select className='w-80% mt-[5px] pl-2 pr-2 text-3xl w-[95%]  ml-[5px] mr-3 rounded-full border-2 border-purple-600'type="text" placeholder='Enter return date..' value={loan_status} onChange={(e) => setLoanStatus(e.target.value)}>
                  <option>Get</option>
                  <option>Returned</option>
              </select>
              <button className='button text-4xl bg-blue-600 rounded-full w-[32%] ml-[34%] m-5' onClick={handleEditLoan}>Edit</button>
        </div>
        </div>
        <h2 className='depositeName'> All Users Loans Table </h2>
        <div className=' overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1400px]'> 
       
        <table className='w-full' >
              
        <tr> 
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Sr.No.</td>
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Loan id</td>
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>user Name</td>
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Loan Amount</td>     
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Get Date</td>
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Re-Date</td>
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Loan Type</td>    
                    <td  className="p-1 border-2 border-black text-center" style={{background:'orange'}}>Status</td>
                       
                </tr>
               
                {data.map((name,index) => (
                
                 <tr> 
                 <td className="p-1 border-2 border-black text-center" style={{background:'white'}}>{index+1}</td>
                 <td className="p-1 border-2 border-black"style={{background:'white'}}>{name.id}</td>
                 <td className="p-1 border-2 border-black"style={{background:'white'}}>{name.user_name}</td>
                 <td className="p-1 border-2 border-black text-right"style={{background:'white'}}>{name.loan_amt}</td>  
                 <td className="p-1 border-2 border-black text-center"style={{background:'white'}}>{name.get_date}</td>
                 <td className="p-1 border-2 border-black text-center"style={{background:'white'}}>{name.r_date}</td>  
                 <td className="p-1 border-2 border-black text-center"style={{background:'white'}}>{name.loan_type}</td>
                 <td className="p-1 border-2 border-black text-center"style={{background:'white'}}>{name.loan_status}</td>             
             </tr>
      ))}
              <tr> 
                    <td colSpan="3" style={{background:'orange'}}>Total Geted Loan</td>
                  
                    <td className="p-1 border-2 border-black text-right"style={{background:'orange'}}>{loan_amt}</td>     
                    <td className="p-1 border-2 border-black "colSpan="3" style={{background:'orange'}}>Total Returned Loan </td>
                    <td className="p-1 border-2 border-black text-right"style={{background:'orange'}}>{loan_amt_returned}</td>
                 
                 
                       
                </tr>
           
           
        </table>
      </div> 
    </div>
  )
}

export default Loan
