import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';

import axios from 'axios';
const LoanRequest = () => {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(0);
   
    const [loanReqests_amt, set_req_amt] = useState(0);
    function getTotalloanReqests() {

        const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalloanRequests.php`;
        let fData2 = new FormData();
        fData2.append('name', localStorage.getItem('team'));

        axios.post(url2, fData2).then((response) => {
            const APIResponse = response.data;// This is response data from AXIOS
            set_req_amt(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));

    }
    function getData() {

        const url = `${process.env.REACT_APP_domain}/sjh-team-api/loanRequests.php`;
        let fData = new FormData();
        fData.append('name', localStorage.getItem('team'));
   
        axios.post(url, fData).then((response) => {

            const APIResponse = response.data;// This is response data from AXIOS
            setData(APIResponse); // Only Response from API is set in state
        }).catch(error => alert(error, " Try Again...!"));


        // get total deposite


    }


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


    const [status, setStatus] = useState("Pending...");
    const [reply,setReply]=useState("");
    const [username,setUserName]=useState("");
    const [requestId,setRequestId]=useState();
   

    const handleEditLoanRequests = () => {

        if (username.length === 0) {
            alert("User Name is left");
        }
        else if (requestId.length === 0) {
            alert("request id is left");
        }
        else if (status.length === 0) {
            alert("status is left");
        }
        else if (reply.length === 0) {
            alert("Reply is left");
        }
        else {
            if (confirm(`Conferm to edit loan request of user => ${name} and request id => ${requestId}`)) {
                setSpinner(1);
                const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/edit_Request_status.php`;
                let fData = new FormData();
                fData.append('username', username);
                fData.append('status', status);
                fData.append('id', requestId);
                fData.append('reply',reply);

                fData.append('team', localStorage.getItem('team'));
               
                axios.post(url, fData).then((result) => {
                    getData();
                 
                    setSpinner(0);
                    if (result.status == 200) {
                        alert("sucessfuly add..",)
                    }
                    else {
                        alert(result.data);
                    }
                    getData();
                })
                    .catch(error => alert(error, " Try Again...!"));
            }
        }

    }


    useEffect(() => {
        getData();
        getTotalloanReqests();
        getTotalNames();
    },[]);



    return (
        <div className='deposite-page overflow-scroll h-screen pt-[100px] bg-gradient-to-r from-purple-300 to-blue-300'>
        {/* Spinner Loader */}
        <div role="status" className={`${spinner ? "block" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    
        {/* Form Section */}
        <div className="flex items-center justify-center h-fit m-[20px]">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transition-transform transform hover:scale-105 duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Loan Requests</h2>
    
                {/* Select Field 1 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">User Name</label>
                    <select value={username} onChange={(e) => setUserName(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300 hover:bg-gray-200">
                        <option>User Name...</option>
                        {names.map((name, index) => (
                            <option key={index}>{name.user_name}</option>
                        ))}
                    </select>
                </div>
    
                {/* Select Field 2 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Request ID</label>
                    <select value={requestId} onChange={(e) => setRequestId(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300 hover:bg-gray-200">
                        <option>Select ID...</option>
                        {data.map((item, index) => (
                            <option key={index}>{item.id}</option>
                        ))}
                    </select>
                </div>
    
                {/* Select Field 3 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Request Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300 hover:bg-gray-200">
                        <option>Select Status...</option>
                        <option>Pending..</option>
                        <option>Approved..</option>
                        <option>Reject..</option>
                    </select>
                </div>
    
                {/* Reply Input Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Reply</label>
                    <input value={reply} onChange={(e) => setReply(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition duration-300 hover:bg-gray-200" />
                </div>
    
                {/* Submit Button */}
                <button
                    onClick={handleEditLoanRequests}
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-300"
                >
                    <FaPaperPlane className="mr-2" />
                    Submit
                </button>
            </div>
        </div>
    
        {/* Title for Loan Requests */}
        <h2 className='mt-9 text-3xl text-center text-green-700 font-extrabold p-2'>All Users Loan Requests</h2>
    
        {/* Loan Requests Table */}
        <div className='overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl mx-auto mt-5 bg-white rounded-lg shadow-md'>
            <table className='w-full'>
                <thead>
                    <tr className='bg-orange-500 text-white'>
                        <th className='p-2 text-center'>Sr.No.</th>
                        <th className='p-2 text-center'>Request ID</th>
                        <th className='p-2 text-center'>User Name</th>
                        <th className='p-2 text-center'>Amount</th>
                        <th className='p-2 text-center'>Duration</th>
                        <th className='p-2 text-center'>Need Date</th>
                        <th className='p-2 text-center'>Request Date</th>
                        <th className='p-2 text-center'>Status</th>
                        <th className='p-2 text-center'>Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`hover:bg-gray-100`}>
                            <td className='p-1 border-b border-gray-300 text-center'>{index + 1}</td>
                            <td className='p-1 border-b border-gray-300 text-center'>{item.id}</td>
                            <td className='p-1 border-b border-gray-300'>{item.user_name}</td>
                            <td className='p-1 border-b border-gray-300 text-center'>{item.amount}</td>
                            <td className='p-1 border-b border-gray-300 text-center'>{item.EMI_duration}</td>
                            <td className='p-1 border-b border-gray-300 text-right pr-2'>{item.need_date}</td>
                            <td className='p-1 border-b border-gray-300 text-center'>{item.request_date}</td>
                            <td className='p-1 border-b border-gray-300 text-center' style={{ background: item.status === 'Approved..' ? '#4CAF50' : item.status === 'Pending..' ? '#FFC107' : '#F44336', color: 'white' }}>{item.status}</td>
                            <td className='p-1 border-b border-gray-300 text-[25px] pr-2'>{item.reply}</td>
                        </tr>
                    ))}
                    <tr className='font-bold bg-orange-500 text-white'>
                        <td className='p-2 text-center' colSpan="2">Total ===></td>
                        <td className='p-2 text-right' colSpan="2">{loanReqests_amt}</td>
                        <td className='p-2 text-right' colSpan="5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    

    )
}


export default LoanRequest
