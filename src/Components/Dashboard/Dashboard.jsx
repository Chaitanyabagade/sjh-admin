import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios  from 'axios';
const Dashboard = () => {


 const [balanceAtBank,setBalanceBank]=useState(0);
 const [totalDeposite,setTotalDeposite]=useState(0);
 const [totalIntrest,SetTotalInters]=useState(0);
 const [totalPenalty,setTotalPenaly]=useState(0);
 const [totalExpendature,setTotalExpendature]=useState(0);
 const [totalGetedLoan,setTotalGetedLoan]=useState(0);
 const [totalReturnedLoan,setTotalreturnedLoan]=useState(0);
 const [numberOfMembersInTeam,setNumberOfMemberInTeam]=useState(0);


 function getTotalBalance(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/balanceInAccount.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setBalanceBank(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalDeposite(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalDeposite.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalDeposite(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalIntrest(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalIntrest.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  SetTotalInters(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalPenaly(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalPenalty.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalPenaly(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalExpendature(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalExpendature.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalExpendature(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalGetedLoan(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoan.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalGetedLoan(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalReturnedLoan(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoanReturned.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalreturnedLoan(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}

function getTotalNumberOfMember(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getNumberOfMemberInTeam.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setNumberOfMemberInTeam(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}



useEffect(()=>{
  getTotalBalance();
  getTotalDeposite();
  getTotalIntrest();
  getTotalPenaly();
  getTotalExpendature();
  getTotalReturnedLoan();
  getTotalGetedLoan();
  getTotalNumberOfMember();
},[]);

  return (
    <>

      <div className="overflow-y-scroll dashboard-page flex-wrap justify-center grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">


        <div className="m-9  bg-[rgba(255,255,255,0.8)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Balance At Bank</h1>
          {balanceAtBank>=0?<h1 className='text-green-600  pt-2'>Rs. { balanceAtBank}</h1>:<h1 className='text-red-600 pt-2'>Rs.{ balanceAtBank}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Deposite</h1>
          {<h1 className='text-black pt-2'> Rs. {totalDeposite}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Intrest</h1>
          {<h1 className='text-black pt-2'>Rs. {totalIntrest}</h1>}
        </div>


        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Penaly</h1>
          {<h1 className='text-black pt-2'> Rs. {totalPenalty}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Expendature</h1>
          {<h1 className='text-black pt-2'> Rs. {totalExpendature}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Dispatched Loan </h1>
          {<h1 className='text-black pt-2'>Rs. {totalGetedLoan }</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Retured Loan by user</h1>
          {<h1 className='text-black pt-2'> Rs. { totalReturnedLoan}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Deposite by Per Member</h1>
          {<h1 className='text-black pt-2'> Rs. { parseInt((totalDeposite)/(numberOfMembersInTeam))}</h1>}
        </div>

        <div className="m-9  bg-[rgba(255,255,255,0.4)] text-black font-bold text-3xl text-center  hover:shadow-2xl    border-[1px]  border-orange-500 rounded-[15px]  h-fit">
          <h1 className='text-black p-2 mt-2'  >Total Valuation</h1>
          {((totalDeposite+ totalIntrest + totalPenalty-totalExpendature)-totalDeposite)>=0?<h1 className='text-green-600 pt-2'> Rs. { parseInt((((totalDeposite+ totalIntrest + totalPenalty )-(totalExpendature))/numberOfMembersInTeam)) }</h1>:<h1 className='text-red-600 pt-2'> Rs. { parseInt(((totalDeposite+ totalIntrest + totalPenalty )-(totalExpendature))/numberOfMembersInTeam) }</h1>}
        </div>





      </div>
    </>
  )
}



export default Dashboard
