import '../css/LoginForm.css';
import axios from 'axios';
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/Buddy_img.jpeg'; 
import React from 'react';

function LoginForm({user,setUser}){
  const inputRef=React.useRef();


return (
  <div className="wrapper fadeInDown">
  <div id="formContent">
    <div className="fadeIn first">
      <img src={logo} id="icon" alt="Welcome Buddy" />
    </div>
    <form  onSubmit={(e)=>{
      setUser({userName:inputRef.current.value})
      login(e)}}>
      <input type="text" id="userName" className="fadeIn second" name="login" placeholder="User name" ref={inputRef} />
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
      <input type="submit" className="fadeIn fourth" defaultValue="Log In"/>
    </form>
    <div id="formFooter">
      <Link className="underlineHover" to="/register">Register</Link>
      <Link to="/Home">Home </Link>
    </div>
  </div>
</div>
);
}
function login(e){
    e.preventDefault();
    console.log("LOGIN START");

}


export default LoginForm