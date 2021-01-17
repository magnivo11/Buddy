import '../css/Forms.css';
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

function LoginForm({user,setUser}){
  const inputRef=React.useRef();
  

if(!user.userName)
return (
  <div>
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
      
        <div className="wrapper fadeInDown">
           <div id="formContent">
              <div className="fadeIn first">
              
                <img src={logo} id="icon" alt="Welcome Buddy" />
                <h1 style={{fontSize: '35px', color:'#51361A'}}>Nice to see you again! </h1> 
                <h3 style={{color:'#51361A'}}>Log in </h3> 

              </div>
              <form  onSubmit={(e)=>{
                setUser({userName:inputRef.current.value})
                login(e)}}>
                <input type="text" id="userName" className="fadeIn second" name="login" placeholder="User name" ref={inputRef} />
                <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
                <input type="submit" className="fadeIn fourth"  value="Login"/>
              </form>
              <div id="formFooter">
                <Link className="underlineHover" style= {{color:'#51361A'}} to="/register">Don't have an account? Register!</Link>
              
              </div>
           </div>
         </div>
       </div>
   </section>
</div>
);
else
return(<Redirect to="/home"/>);
}
function login(e){
    e.preventDefault();
    console.log("LOGIN START");

}


export default LoginForm