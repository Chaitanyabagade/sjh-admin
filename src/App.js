
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar'
import HomePage from './Components/HomePage/HomePage';
import LoginPages from './Components/Login/LoginPages';
import SignUp from './Components/SignUp/SignUp';
import About from './Components/About/About'
import Dashboard from './Components/Dashboard/Dashboard';
import Logout from './Components/Logout/Logout';
import Deposites from './Components/Deposites/Deposites';
import Loan from './Components/Loan/Loan';

import Penalty from './Components/Penalty/Penalty';
import Expendature from './Components/Expendature/Expendature';

function App() {
 

  return (
    
    <div className="App">
   <BrowserRouter>


      <Navbar></Navbar>
          <Routes>
               <Route path="/" element={<HomePage/>}> </Route>
               <Route path="login" element={<LoginPages></LoginPages>}> </Route>
               <Route path="sign_up" element={<SignUp></SignUp>}></Route>
               <Route path="about" element={<About></About>}></Route>
               <Route path="dashboard" element={<Dashboard/>}></Route>
               <Route path="logout" element={<Logout/>}/>
               <Route path="deposites" element={<Deposites/>}/>
               <Route path="loans" element={<Loan/>}/>
              
               <Route path="penaltys" element={<Penalty/>}/>
               <Route path="expendatures" element={<Expendature/>}/>
             
               
               
            

               

                
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
