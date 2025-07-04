import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
const AdminSetting = () => {
  const [data, setData] = useState([]);
 
  function getData() {

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));

    axios.post(url, fData).then((response) => {

      const APIResponse = response.data;// This is response data from AXIOS
      setData(APIResponse); // Only Response from API is set in state

    }).catch(error => alert(error, " Try Again...!"));


    

  }
  function changePermision(id,permision) {
    setSpinner(1);
    var per=0;
    if(permision){
      per=0;
    }
    else{
      per=1;
    }
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/ChangeAdminPermision.php`;
    let fData = new FormData();
    fData.append('id', id);
    fData.append('per',per);

    axios.post(url, fData).then((response) => {
   
      getData();
      setSpinner(0);
    }).catch(error => alert(error, " Try Again...!"));


    // get total deposite
   

  }

  useEffect(() => {
    getData();
   
  }, [])

  const [spinner, setSpinner] = useState(0);
  return (
    <div className='overflow-scroll deposite-page justify-center w-full h-screen bg-gradient-to-r from-blue-200 to-green-300 pt-24'>
 {/* Loading Spinner */}
 <div role="status" className={`${spinner ? "block" : "hidden"} absolute inset-0 flex items-center justify-center`}>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  

      {/* User Deposits Table */}
      <h1 className='text-center text-2xl font-bold mt-8'>All Admins</h1>

      <div className='overflow-x-auto w-[95%] ml-[2.5%] text-sm sm:text-xl md:text-2xl lg:text-3xl mx-auto mt-5 bg-white shadow-xl rounded-lg'>
        <table className='w-[100%]'>
          <thead className='bg-orange-500'>
            <tr className='bg-orange-500 w-full text-white'>
              <th className='p-2 text-center'>Sr.No.</th>
              <th className='p-2 text-center'>Admin Name</th>
              <th className='p-2 text-center'>Permision</th>
              {localStorage.getItem('user_name')==='chaitanya bagade'? <th className='p-2 text-center w-fit'>Action</th>:''}
            </tr>
          </thead>
          <tbody>
            {data.map((name, index) => (
              <tr key={index} className='hover:bg-purple-500'>
                <td className='p-2 text-center border-b border-gray-200'>{index + 1}</td>
                <td className='p-2 border-b border-gray-200'>{name.admin_name}</td>
                <td className='p-2 text-center border-b  border-gray-200'>{name.permision?'Permision':'Not Permision'}</td>
               {localStorage.getItem('user_name')==='chaitanya bagade'?<td className='p-2 text-center border-b  w-fit border-gray-200'> <button onClick={()=>changePermision(name.id,name.permision)} className='border-orange-500 border-2 rounded-xl'>Change Per.</button></td>:''}
              </tr>
            ))}
            <tr className='bg-orange-500 text-white'>
              <td colSpan="3" className='p-2 text-center'></td>
              <td className='p-2 text-right'></td>
              {localStorage.getItem('user_name')==='chaitanya bagade'?<td className='p-2'></td>:""} {/* Empty cell for alignment */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default AdminSetting
