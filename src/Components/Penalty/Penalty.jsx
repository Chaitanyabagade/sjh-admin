import React, { useEffect, useState } from 'react'
import './penalty.css'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const Penalty = () => {
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
    console.log(names);

  }


  const [penalty_amt, setPen_amt] = useState(0);
  function getTotalpenalty() {

    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalPenalty.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setPen_amt(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));

  }
  function getData() {

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/penalty.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));

    axios.post(url, fData).then((response) => {

      const APIResponse = response.data;// This is response data from AXIOS
      setData(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));


    // get total deposite


  }



  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");


  const handleAddPenalty = () => {
    console.log(name, amount);
    if (name.length === 0) {
      alert("User Name is left");
    }
    else if (amount<= 0) {
      alert("Amount is left");
    }
    else if (note.length === 0) {
      alert("note is left");
    }
    else if (date.length === 0) {
      alert("date is left");
    }
    else {
      setSpinner(1);
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_penalty.php`;
      let fData = new FormData();
      fData.append('name', name);
      fData.append('amount', amount);
      fData.append('date', date);
      fData.append('note', note);
      fData.append('team', localStorage.getItem('team'));
      fData.append('mobile_no', localStorage.getItem('mobile_no'));
      fData.append('admin_name', localStorage.getItem('user_name'));
      axios.post(url, fData).then((result) => {
        setSpinner(0);
        if (result.status == 200) {
          alert("Penaly added sucessfuly...");
        }
        else {
          alert("Error to add penalty...");
        }
        getData();
        getTotalpenalty();
      })
        .catch(error => alert(error, " Try Again...!"));

    }


  }


  useEffect(() => {
    getData();
    getTotalpenalty();
    getTotalNames();
  }, [])



  return (
    <div className=' pt-[100px] deposite-page bg-gradient-to-r from-blue-200 to-green-300 '>
      <div role="status" className={`${spinner ? "block" : "hidden"} absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`}>
        <svg aria-hidden="ture" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="flex items-center m-[20px] justify-center h-fit  ">
        <div className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
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
        </div>
      </div>


      <h2 className='mt-9 text-3xl text-center w-[300px] rounded-full text-green-700 font-bold p-2 ml-auto mr-auto'> All Users Penalty </h2>

      <div className='overflow-x-auto mt-5'>
      <table className='min-w-full bg-black text-[15px] sm:text-2xl md:text-3xl lg:text-4xl'>
  <thead>
    <tr className='border-2 border-gray-300 bg-orange-500'>
      <th className='p-2 border border-gray-300 text-center'>Sr.No.</th>
      <th className='p-2 border border-gray-300 text-center'>User Name</th>
      <th className='p-2 border border-gray-300 text-center'>Date</th>
      <th className='p-2 border border-gray-300 text-center'>Note</th>
      <th className='p-2 border border-gray-300 text-center'>Penalty</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index} className=' bg-white hover:bg-gray-100'>
        <td className='p-2 border border-gray-300 text-center'>{index + 1}</td>
        <td className='p-2 border border-gray-300'>{item.user_name}</td>
        <td className='p-2 border border-gray-300 text-center'>{item.Date}</td>
        <td className='p-2 border border-gray-300'>{item.note}</td>
        <td className='p-2 border border-gray-300 text-right pr-2'>{item.penalty}</td>
      </tr>
    ))}
    <tr className='bg-orange-500'>
      <td className='p-2 border border-gray-300 text-center' colSpan="4">Total</td>
      <td className='p-2 border border-gray-300 text-right pr-2'>{penalty_amt}</td>
    </tr>
  </tbody>
</table>

  </div>

    </div>

  )
}

export default Penalty
