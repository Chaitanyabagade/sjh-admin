import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Loan = () => {

  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [names, setNames] = useState([]);
  function getTotalNames() {



    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setNames(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));


  }

  const [total_intrest_amt, setTotal_intrest_amt] = useState(0);
  function getTotalIntrest() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalIntrest.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setTotal_intrest_amt(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));

  }



  const [loan_amt_returned, setloan_amt_returned] = useState(0);
  function getTotalLoanReturned() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoanReturned.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setloan_amt_returned(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));

  }



  const [loan_amt, setloan_amt] = useState(0);
  function getTotalLoan() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoan.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setloan_amt(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));

  }


  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/user_loan.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));

    axios.post(url, fData).then((response) => {

      const APIResponse = response.data;// This is response data from AXIOS
      setData(APIResponse); // Only Response from API is set in state
      console.log(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }



  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [getDate, setGetDate] = useState("");
  const [duration, setDuration] = useState();

  const handleAddLoan = () => {
    if (confirm(`Conferm to Add loan of user => ${name} and duration => ${duration}`)) {

      if (name.length === 0) {
        alert("User Name is left");
      }
      else if (amount <= 0) {
        alert("Amount is not in negative or zero");
      }
      else if (getDate.length === 0) {
        alert("get date is left");
      }
      else if (duration.length === 0) {
        alert("duration is left");
      }
      else {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_loan.php`;
        let fData = new FormData();
        fData.append('name', name);
        fData.append('amount', amount);
        fData.append('get_date', getDate);
        fData.append('duration', duration);
        fData.append('team', localStorage.getItem('team'));
        fData.append('mobile_no', localStorage.getItem('mobile_no'));
        fData.append('admin_name', localStorage.getItem('user_name'));

        axios.post(url, fData).then((result) => {
          if (result.status == 200) {
            alert("sucessfuly add..");
            getData();
            getTotalLoan();
            getTotalLoanReturned();
            getTotalIntrest();

          }
          else {
            alert(result.data);
          }
          setSpinner(0);
        })
          .catch(error => alert(error, " Try Again...!"));
      }
    }
  }


  const [id, setId] = useState();
  const [name2, setName2] = useState("");
  const [loan_Date, setLoanDate] = useState("");

  const handleEditLoan = () => {

    if (name2.length === 0) {
      alert("User Name is left");
    }
    else if (id.length === 0) {
      alert("loan id is left");
    }
    else if (id != Actionids) {
      alert("Action id is not same as id");
      setActionid(null);
    }
    else if (loan_Date.length === 0) {
      alert("now date is left");
    }

    else {
      if (confirm(`Conferm to Edit loan of user => ${name2} and loan id => ${id}`)) {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/edit_loan.php`;
        let fData = new FormData();
        fData.append('name', name2);
        fData.append('id', id);
        fData.append('lastDate', loan_Date);
        fData.append('team', localStorage.getItem('team'));
        fData.append('mobile_no', localStorage.getItem('mobile_no'));
        fData.append('admin_name', localStorage.getItem('user_name'));

        axios.post(url, fData).then((result) => {
          getData();
          getTotalLoan();
          getTotalLoanReturned();
          getTotalIntrest();
          setSpinner(0);
          setActionid(null);
          if (result.status == 200) {
            if (result.data == 'Aclear') {
              alert("The User Loan Is Already Cleared If you are in any Problem Please Contact to Technical Manager");
            } else if (result.data == 'Nclear') {
              alert("Th EMI is successfuly added And The User Loan is Now Clear");
            }
            else if (result.data == 'yes') {
              alert("The EMI is successfuly added..");
            }
            else {
              alert("something is gone wrong please immidiate contact to the technical manager");
              alert(result.data);
              console.log(result.data);
            }
          }
          else {
            alert(result.data);
          }
        })
          .catch(error => alert(error, " Try Again...!"));
      }
    }
  }


  useEffect(() => {
    getData();
    getTotalLoanReturned();
    getTotalLoan();
    getTotalNames();
    getTotalIntrest();
  }, []);

  const [Actionids, setActionid] = useState(null);
  const ActionId = async (id) => {
    setActionid(id);
  }

  return (
    <div className='deposite-page bg-gradient-to-r from-teal-200 to-green-200 pt-[50px]'>
      <div role="status" className={`${spinner ? "block" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`}>
        <svg aria-hidden="ture" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="lg:flex justify-center ">

        <div className="flex items-center justify-center h-fit mt-10 lg:m-[100px] m-[20px] mb-0 lg:w-[400px] ">
          <div className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Loan</h2>

            {/* Select Field 1 */}
            <div className="mb-6">
              <select value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
                <option>User Name...</option>
                {names.map((name, index) => (
                  <option >{name.user_name}</option>
                ))}
              </select>
            </div>

            {/* Select Field 2 */}
            <div className="mb-6">
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>

            {/* Select Field 2 */}
            <div className="mb-6">
              <input value={getDate} type="date" onChange={(e) => setGetDate(e.target.value)} placeholder='Enter Date' className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>
            {/* Select Field 2 */}
            <div className="mb-8">
              <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder='Enter Duration' className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>

           

            {/* Submit Button */}
            <button
              onClick={handleAddLoan}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
            >
              <FaPaperPlane className="mr-2" />
              Submit
            </button>
          </div>
        </div>


        <div className="flex items-center justify-center h-fit mt-10 lg:m-[100px] m-[20px] mb-0  lg:w-[400px]  ">
          <div className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Loan EMI</h2>

            {/* Select Field 1 */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">User Name</label>
              <select value={name2} onChange={(e) => setName2(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
                <option>User Name...</option>
                {names.map((name, index) => (
                  <option >{name.user_name}</option>
                ))}
              </select>
            </div>

            {/* Select Field 2 */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Loan Id</label>
              <input value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter Loan id..' className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />

            </div>

            <label className="block text-gray-700 text-sm font-semibold mb-2">Now Date</label>
            <div className="mb-6">
              <input value={loan_Date} type="date" onChange={(e) => setLoanDate(e.target.value)} placeholder='Enter now Date' className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />

            </div>

            {/* Submit Button */}
            <button
              onClick={handleEditLoan}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
            >
              <FaPaperPlane className="mr-2" />
              Submit
            </button>
          </div>
        </div>

      </div>
      <h2 className='depositeName mb-10  text-center text-purple-700 text-4xl font-bold  '>  <Link to="/loanrequests" >See Loan Requests</Link></h2>
      <h2 className='depositeName  text-center text-green-700 text-4xl font-bold '> All Users Loan </h2>
      <div className='rounded-[10px] overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[95%]'>

        <table className='w-fit text-[25px]'>
          <tr>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Action</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Sr.No.</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan id</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>User Name</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan Amt</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan Amt Returned</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Interest Amt</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Interest Amt Returned</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan Type</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>EMI Amt</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>EMI Duration</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>EMI Count</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>EMI Rate</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan Date</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Last EMI Paid Date</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Loan Provider</td>
            <td className="font-bold p-2 pl-3 pr-3 border border-gray-300 text-center" style={{ background: 'orange' }}>Status</td>
          </tr>

          {data.map((item, index) => (
            <tr className={Actionids === item.id ? 'bg-green-400 mt-5' : 'bg-white hover:bg-purple-500'}>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">
                <button onClick={() => ActionId(item.id)}>Action</button>
              </td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{index + 1}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.id}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-left text-black">{item.user_name}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_amt}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_amt_returned}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_amt_intrest}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_amt_intrest_returned}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_type}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.EMI_amt}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.EMI_duration}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.EMI_count}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.EMI_rate}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.Loan_date}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.last_paid_date}</td>
              <td className="pl-1 pr-1 border border-gray-300 text-center text-black">{item.loan_provider}</td>
              <td className={`pl-1 pr-1 border border-gray-300 text-center ${item.status === 'Clear' ? 'bg-green-500' : 'bg-red-400'}`}>{item.status}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="4" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>Total Returned Loan</td>
            <td colSpan="2" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>{loan_amt_returned}</td>

            <td colSpan="3" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>Total Dispatched Loan</td>
            <td colSpan="3" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>{loan_amt}</td>

            <td colSpan="3" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>Total Interest ==></td>
            <td colSpan="2" className="pl-1 pr-1 border border-gray-300 text-center font-bold p-2" style={{ background: 'orange' }}>{total_intrest_amt}</td>
          </tr>
        </table>

      </div>
    </div>
  )
}

export default Loan
