import '../css/Forms.css'
import axios from 'axios'
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

function RegisterForm(){

  const[info,setInfo]=React.useState({showMessege:false,redirectToLogin:false,message:''});
if(!info.redirectToLogin)
  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <img src={logo} id="icon" alt="Welcome Buddy" />
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Welcome to the family! </h1> 
                {info.showMessege? <div>{info.message}</div>:null }
                <h3 style= {{color:'#51361A'}}> Register </h3> 
          
              </div>
              <form  onSubmit={(e)=>{register(e,setInfo)}}>
                <input type="text" id="first_name" className="fadeIn second" name="register" placeholder="First name" />
                <input type="text" id="last_name" className="fadeIn second" name="register" placeholder="Last name"  />
                <input type="text" id="email" className="fadeIn second" name="register" placeholder="Email Address" />
                <input type="text" id="password" className="fadeIn third" name="register" placeholder="Password" />
                <input type="submit" className="fadeIn fourth" defaultValue="register" value="Register"/><br/>
                <Link style= {{color:'#51361A'}} className="underlineHover" to="/login">Already a member? Login!</Link>

              </form>
              <div id="formFooter">
                <Link style= {{color:'#51361A'}} className="underlineHover" to="/login"> </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  else{  return(<Redirect to="/login"/>);}
  }
   
function register(e,setInfo){

  e.preventDefault();
  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById('email').value)))
  setInfo({showMessege:true,message:'invalid email adress'})
  else{
  axios.get('http://localhost:8080/user/byemail/'+document.getElementById('email').value).
  then((Response)=>{
    if(Response.data) {
    setInfo({showMessege:true,message:'this email is  taken, please use a different one'})}
  else {
    const newUser= { 
      name:document.getElementById('first_name').value ,
      lastName: document.getElementById('last_name').value ,
      email: document.getElementById('email').value ,
      password: document.getElementById('password').value ,
  }
  console.log(newUser);
  axios.post('http://localhost:8080/user/',newUser)
    setInfo({redirectToLogin:true})
  }
})
  }


}

export default RegisterForm