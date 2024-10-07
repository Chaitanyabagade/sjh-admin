import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const Deposites = () => {
  const [data, setData] = useState([]);



  const [dep_amt, setDep_amt] = useState(0);
  function getTotalDeposite() {

    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalDeposite.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));

    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;// This is response data from AXIOS
      setDep_amt(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));

  }
  function getData() {

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/deposite2.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));

    axios.post(url, fData).then((response) => {

      const APIResponse = response.data;// This is response data from AXIOS
      setData(APIResponse); // Only Response from API is set in state
    }).catch(error => alert(error, " Try Again...!"));


    // get total deposite
    getTotalDeposite();

  }


  useEffect(() => {
    getData();
  }, [])



  const [name, setName] = useState("");
  const [amount, setAmount] = useState();



  const handleAddDeposite = () => {
    console.log(name, amount);
    if (name.length === 0) {
      alert("User Name is left");
    }
    else if (amount.length === 0) {
      alert("Amount is left");
    }
    else {
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_deposite.php`;
      let fData = new FormData();
      fData.append('name', name);
      fData.append('amount', amount);
      fData.append('team', localStorage.getItem('team'));

      axios.post(url, fData).then((result) => {
        getData();
      })
        .catch(error => alert(error, " Try Again...!"));

    }


  }
  return (
    <div className='deposite-page justify-center w-[100%] h-[100vh] bg-gradient-to-r pt-[100px] from-violet-200 to-pink-200'>
      <div className="flex items-center justify-center h-fit  m-[20px] ">
        <form className=" text-xl bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Deposite</h2>

          {/* Select Field 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">User Name</label>
            <select value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
              <option>User Name...</option>
              {data.map((name, index) => (
                <option >{name.user_name}</option>
              ))}
            </select>
          </div>

          {/* Select Field 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Amount</label>
            <select value={amount} onChange={(e) => setAmount(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none">
              <option>Select Amt...</option>
              <option> 300</option>
              <option> 500</option>
              <option>-300</option>
              <option>-500</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddDeposite}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane className="mr-2" />
            Submit
          </button>
        </form>
      </div>



      <h1 className='depositeName'> All Users Deposites  </h1>

      <div className=' overflow-x-scroll text-[15px] sm:text-2xl md:text-3xl lg:text-4xl ml-auto mr-auto mt-5 bg-black w-[350px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]'>
        <table className='w-full mb-9'>
          <tr>
            <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Sr.No.</td>
            <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>user Name</td>
            <td className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Deposite</td>
          </tr>

          {data.map((name, index) => (

            <tr>
              <td className='p-1 border-2 border-black text-center' style={{ background: 'white' }}>{index + 1}</td>
              <td className='p-1 border-2 border-black text-' style={{ background: 'white' }}>{name.user_name}</td>
              <td className='p-1 border-2 border-black text-right' style={{ background: 'white' }}>{name.deposite}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className='p-1 border-2 border-black text-center' style={{ background: 'orange' }}>Total</td>
            <td className='p-1 border-2 border-black text-right' style={{ background: 'orange' }}>{dep_amt}</td>
          </tr>


        </table>
      </div>
    </div>
  )
}

export default Deposites
