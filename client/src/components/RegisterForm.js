import '../css/LoginForm.css'
import axios from 'axios'
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

function RegisterForm({user,setUser}){
  const inputRef=React.useRef();


  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <img src={logo} id="icon" alt="Welcome Buddy" />
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Welcome to the family! </h1> 
                <h3 style= {{color:'#51361A'}}> Register </h3> 
          
              </div>
              <form  onSubmit={(e)=>{
                setUser({userName:inputRef.current.value})
              register(e)}}>
                <input type="text" id="first_name" className="fadeIn second" name="register" placeholder="First name" ref={inputRef} />
                <input type="text" id="last_name" className="fadeIn second" name="register" placeholder="Last name" ref={inputRef} />
                <input type="text" id="email" className="fadeIn second" name="register" placeholder="Email Address" ref={inputRef} />
                <input type="text" id="password" className="fadeIn third" name="register" placeholder="Password" />
                <input type="submit" className="fadeIn fourth" defaultValue="register"/><br/>
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
  }
   
function register(e){

  e.preventDefault();
  const newUser= { 
      'firstName':document.getElementById('first_name').value ,
      'lastName': document.getElementById('last_name').value ,
      'email': document.getElementById('email').value ,
      'password': document.getElementById('password').value ,
  }
  console.log(newUser);
  axios.post('http://localhost:8080/user/register',newUser).then((Response)=>{console.log(Response.data)})
  
  
  //to test user update
  //axios.post('http://localhost:8080/user/update',newUser)


  
  //need to add post to server//////

}

export default RegisterForm