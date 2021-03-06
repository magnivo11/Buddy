import '../css/Forms.css'
import axios from 'axios'
import DataContext from '../DataContext';
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

export default function EditUser(){
  //const user=React.useContext(DataContext);
  const userIDfromSession= window.sessionStorage.getItem('userID');
  ;
  const[info,setInfo]=React.useState({showMessege:false,redirectToProfile:false});
if(!info.redirectToProfile)
  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <img src={logo} id="icon" alt="Welcome Buddy" />
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Edit My Profile </h1> 
                {info.showMessege? <div>this email is  taken, please use a different one</div>:null }
          
              </div>
              <form  onSubmit={(e)=>{editUser(e,userIDfromSession,setInfo)}}>
                <input type="text" id="first_name" className="fadeIn second"  placeholder="First name" />
                <input type="text" id="last_name" className="fadeIn second"  placeholder="Last name"  />
                <input type="text" id="email" className="fadeIn second"  placeholder="Email Address" />
                <input type="text" id="password" className="fadeIn third"  placeholder="Password" />
                <input type="submit" className="fadeIn fourth" value="Save"/><br/>

              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  else{  return(<Redirect  to={`/profile`}/>);}
  }
   
function editUser(e,userIDfromSession,setInfo){

  e.preventDefault();
  axios.get('http://localhost:8080/user/byemail/'+document.getElementById('email').value).
  then((Response)=>{
    console.log(Response)
    if(Response.data){
      if(Response.data._id!=userIDfromSession) {
        setInfo({showMessege:true})}
    } 
  else {
    const newUser= { 
      id:userIDfromSession,
      name:document.getElementById('first_name').value ,
      lastName: document.getElementById('last_name').value ,
      email: document.getElementById('email').value ,
      password: document.getElementById('password').value ,
  }
  console.log(newUser);
  axios.put('http://localhost:8080/user/',newUser)
    setInfo({redirectToProfile:true})
  }
})


}
