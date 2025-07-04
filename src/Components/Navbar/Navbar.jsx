import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.jpg"

const Navbar = () => {

  const [style, setStyle] = useState(0);
  const [style11, setStyle11] = useState("firstline");
  const [style12, setStyle12] = useState("Secondline");
  const [style13, setStyle13] = useState("thirdline");

  const handleClick = () => {
    if (style) {
      setStyle(0);
      setStyle11("firstline");
      setStyle12("Secondline");
      setStyle13("thirdline");
    }
    else {
      setStyle(1);
      setStyle11("firstlineCros");
      setStyle12("SecondlineCros");
      setStyle13("thirdlineCros");

    }
  };

  const [auth, setAuth] = useState("");
  const [reload, seteload] = useState("")
  var reload_flag = localStorage.getItem('reload_flag');
  if (reload_flag != null) {
    localStorage.removeItem('reload_flag');
    window.location.reload();
  }

  const [compatible, setCompatible] = useState(1);

  let navigate = useNavigate();
  useEffect(() => {

    var auth = localStorage.getItem('user_name');
    if (auth === null) {
      navigate('/');

    }
    else {
      setAuth(auth);
    }
    // check device compatiblilty
    if (typeof (Storage) === "undefined") {
      setCompatible(0);
    }


  }, [])




  return (


    <div className='NavBox bg-black fixed justify-center z-10 '>

      <div className={compatible ? ' hidden ' : ' z-100 fixed w-[100%] overflow-scroll h-fit bg-red-600 mx-auto text-center'}>
        <br />
        Your Browser is Not Support this web app please update browser <br /><br />
        <a className='w-fit h-fit pl-5 pr-5 pt-1 pb-1 bg-green-500 mt-[500px] rounded-full' href="https://play.google.com/store/apps/details?id=com.android.chrome&pcampaignid=web_share">Update</a>
        <br /><br />
      </div>
      <button onClick={handleClick} className="sideBarButton">
        <div className={style11}></div>
        <div className={style12}></div>
        <div className={style13}></div>
      </button>



      <div className='w-fit'>
        {!(auth) ? (
          <div className={!style ? `w-fit h-fit ml-[-200px]` : `w-fit h-fit bg-black fixed`}>
            <li className="do-not-delet w-[180px] h-0"></li>

            <Link to="/">  <li style={{ width: '150px' }}>Admin Page</li></Link>
            <Link to="about"> <li>About</li></Link>
            <Link to="login"> <li>Login</li></Link>
            <Link to="contact"> <li>Contact</li></Link>

          </div>

        ) : (
          <div className={!style ? `w-fit h-fit ml-[-200px]` : `w-fit h-fit bg-black fixed`}>
            <li className="do-not-delet w-fit h-0"></li>

            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="dashboard"><li style={{ color: 'orange', width: '180px' }}>{localStorage.getItem('team')}</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="cashbook"> <li>CashBook</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="creditcard"> <li>Cred.C</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="deposites"> <li>Deposit</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="loans"> <li>Loans</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="sip"> <li>SIP</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="penaltys"> <li>Penaltys</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="expendatures"> <li>Expendt.</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="remuneration"> <li>Remunart.</li></Link>
            <Link onClick={() => { window.scrollTo(0, 0); handleClick() }} to="sign_up"> <li style={{ width: '180px' }}> Create user</li></Link>

            <a href="logout"><li>Logout</li></a>

          </div>
        )}




      </div>



    </div>
  )
}

export default Navbar