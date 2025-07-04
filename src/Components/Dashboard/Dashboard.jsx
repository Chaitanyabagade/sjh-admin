import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CChart } from '@coreui/react-chartjs';
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
 const [totalRemunaration,setTotalRemunaration]=useState(0);

 function getTotaltotalRemunaration(){
  const url2=`${process.env.REACT_APP_domain}/sjh-team-api/getTotalRemuneration.php`;
  let fData2= new FormData();
  fData2.append('name',localStorage.getItem('team'));
  axios.post(url2,fData2).then((response) => {
  const APIResponse = response.data;// This is response data from AXIOS
  setTotalRemunaration(APIResponse); // Only Response from API is set in state
  }).catch(error=> alert(error," Try Again...!"));
}
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

const getStyle = (property) => {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

const [sipdata,setSipData]=useState([]);
const getSipData = ()=>{
   
  const url = `${process.env.REACT_APP_domain}/sjh-team-api/sips.php`;
  let fData = new FormData();
  fData.append('team', localStorage.getItem('team'));
  axios.post(url, fData).then((response) => {
    const APIResponse = response.data;// This is response data from AXIOS
    setSipData(APIResponse);
  }).catch(error => alert(error, " Try Again...!"));

}
useEffect(()=>{
  getSipData();
  getTotalBalance();
  getTotalDeposite();
  getTotalIntrest();
  getTotalPenaly();
  getTotalExpendature();
  getTotalReturnedLoan();
  getTotalGetedLoan();
  getTotalNumberOfMember();
  getTotaltotalRemunaration();
},[]);

  return (
    <div className="pt-[100px] min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-6">
  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    
    {[
      { title: "Balance At Bank", value: balanceAtBank, positive: balanceAtBank >= 0 },
      { title: "Total Deposit", value: totalDeposite },
      { title: "Total Interest", value: totalIntrest },
      { title: "Total Penalty", value: totalPenalty },
      { title: "Total Expenditure", value: totalExpendature },
      { title: "Total Dispatched Loan", value: totalGetedLoan },
      { title: "Total Returned Loan by User", value: totalReturnedLoan },
      { title: "Deposit Per Member", value: parseInt(totalDeposite / numberOfMembersInTeam) },
      { 
        title: "Total Valuation", 
        value: Math.round((totalDeposite + totalIntrest + totalPenalty - totalExpendature - totalRemunaration) / numberOfMembersInTeam), 
        positive: (totalDeposite + totalIntrest + totalPenalty - totalExpendature - totalRemunaration) >= totalDeposite 
      }
    ].map((item, index) => (
      <div key={index} className="p-5  bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
        <h3 className={`text-2xl font-bold ${item.positive === false ? 'text-red-500' : 'text-green-500'}`}>
          Rs. {item.value}
        </h3>
      </div>
    ))}
    {
    sipdata.map((item, index) => (
     <div key={1} className="p-5  bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center w-full ">{"SIP "+index+1}</h2> 
        <h2 className={`text-xl font-bold ${item.positive === false ? 'text-red-500' : 'text-green-500'}`}>SIP Invest  Rs.{item.sip_invest}</h2>
        <h3 className={`text-xl font-bold ${item.positive === false ? 'text-red-500' : 'text-green-500'}`}> 
         SIP Value Rs. {item.sip_value}
        </h3>
      </div>
    ))
  }
  </div>

  {localStorage.getItem('team') === 'PavanPutra' && (
    <div className="mt-12 w-full max-h-[800px] overflow-x-auto">
      <CChart
        type="line"
        data={{
          labels: [
            "Aug−23", "Sep−23", "Oct−23", "Nov−23", "Dec−23",
            "Jan−24", "Feb−24", "Mar−24", "Apr−24", "May−24",
            "Jun−24", "Jul−24", "Aug−24", "Sep−24", "Oct−24",
            "Nov−24", "Dec−24","Jan-25" ,"Feb-25"
          ],
          datasets: [
            {
              label: "Deposit",
              backgroundColor: "rgba(102, 126, 234, 0.5)",
              borderColor: "#667EEA",
              pointBackgroundColor: "#667EEA",
              pointBorderColor: "#ffffff",
              data: [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600, 3950, 4350, 4650,5000,5350,5700,6050],
            },
            {
              label: "Valuation",
              backgroundColor: "rgba(72, 187, 120, 0.5)",
              borderColor: "#48BB78",
              pointBackgroundColor: "#48BB78",
              pointBorderColor: "#ffffff",
              data: [300, 700, 1100, 1500, 1800, 2200, 2600, 3000, 3400, 3700, 4100, 4400, 4750, 5000, 5161, 5600 , 6100 , 6300, 6747],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: { color: "#4A5568" },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(229, 231, 235, 0.5)" },
              ticks: { color: "#4A5568" },
            },
            y: {
              grid: { color: "rgba(229, 231, 235, 0.5)" },
              ticks: { color: "#4A5568" },
            },
          },
        }}
      />
    </div>
  )}
</div>

  )
}



export default Dashboard
