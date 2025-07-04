import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const TransferAnotherAdmin = () => {

  const [admins, setAdmins] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [admin2, setAdmin2] = useState("");
  const [admin1, setAdmin1] = useState("");
  const [amount, setAmount] = useState(0);
  const [grandAdminPass, setGrandAdminPass] = useState("");


  function getTotalAdminNames() {

    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setAdmins(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));


  }


  useEffect(() => {
    getTotalAdminNames();
  }, []);


  const handleTransfertoaadmin = () => {

    if (admin1.length === 0) {
      alert("From Admin is left");
    }
    else if (admin2.length === 0) {
      alert("To Admin is left");
    }
    else if (admin1 === admin2) {
      alert("Both admin names are same please select another...");
    }
    else if(admin1==='Select Admin 1...'){
      alert("Admin 1 is left-..");
    }
    else if(admin2==='Select Admin 2...'){
      alert("Admin 2 is left-..");
    }
    else if (amount <= 0) {
      alert("Amount is left...");
    }
    else if (grandAdminPass.length ===0) {
      alert("grandAdminPass is left...");
    }
    
    else {
      if (confirm(`Conferm to  Transfer from admin => ${admin1} to admin => ${admin2}`)) {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/transfertoaadmin.php`;
        let fData = new FormData();
        fData.append('admin1', admin1);
        fData.append('admin2', admin2);
        fData.append('amount', amount);
        fData.append('team', localStorage.getItem('team'));
        fData.append('gadminpass',grandAdminPass);
  
        axios.post(url, fData).then((result) => {

          setSpinner(0);
          if (result.status == 200) {
            alert("sucessfuly Transfer..",)
          }
          else {
            alert(result.data);
          }
          console.log(result.data);
          
        })
          .catch(error => alert(error, " Try Again...!"));
      }
    }


  }
  return (
    <div className='overflow-scroll deposite-page justify-center w-[100%] h-[100vh] bg-gradient-to-r pt-[100px]  from-violet-200 to-pink-200'>
      <div role="status" className={`${spinner ? "block" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`}>
        <svg aria-hidden="ture" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="flex items-center justify-center h-fit  m-[20px] ">

        <div className=" text-xl  bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transfer</h2>

          {/* Select Field 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">From Admin</label>
            <select value={admin1} onChange={(e) => setAdmin1(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
              <option>Select Admin 1...</option>
              {admins.map((name, index) => (
                <option >{name.admin_name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">To Admin</label>
            <select value={admin2} onChange={(e) => setAdmin2(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
              <option>Select Admin 2...</option>
              {admins.map((name, index) => (
                <option >{name.admin_name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
          </div>
          {/* Select Field 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Grand Admin Pass</label>
            <input type="password" value={grandAdminPass} onChange={(e) =>setGrandAdminPass(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
          </div>


          {/* Submit Button */}
          <button
            onClick={handleTransfertoaadmin}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane className="mr-2" />
            Submit
          </button>
        </div>
      </div>


    </div>
  )
}

export default TransferAnotherAdmin
