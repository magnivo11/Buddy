import '../css/Forms.css';
import '../css/Buttons.scss'
import { Link, Redirect } from 'react-router-dom';
import logo from '../Images/Logos/full logo in circle@4x.png';
import React from 'react';
import axios from 'axios'


export default function LoginForm() {
  const [messege, setMessege] = React.useState({ text: '', showMessege: false });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const userIDfromSession = window.sessionStorage.getItem('userID');

  if (!loggedIn && !userIDfromSession) {
    return (
      <div style={{ fontFamily: "Open Sans" }}>
        <section id="hero" className="d-flex align-items-center">
          <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="fadeIn first">
                  <img src={logo} style={{paddingTop:"5%"}} id="icon" alt="Welcome Buddy" />
                  <h1><small  style={{color: '#51361A', fontWeight:'bold'}}>Nice to see you again!</small> </h1>
                  {messege.showMessege ? <div>{messege.text}</div> : null}
                </div>
                <form onSubmit={(e) => { login(e, setLoggedIn, setMessege) }}>
                  <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />
                  <input type="password" id="password" className="fadeIn third" name="login" placeholder="Password" /> <br></br>
                  <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Log in</span></button><br></br>
                </form>
                <div id="formFooter">
                  <Link className="underlineHover" style={{ color: '#51361A' }} to="/register">Don't have an account? Register!</Link><br></br>
                  <Link className="underlineHover" style={{ color: '#51361A' }} to="/forgotpassword">Forgot password?</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  else
    return (<Redirect to="/mygardens" />);
}
function login(e, setLoggedIn, setMessege) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
   var logIn = false;

  fetch(process.env.REACT_APP_SERVER_URL+'/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(data => { logIn = true;},
    error => console.error('wrong password or email')
  ).then(()=>{
    if (logIn===true) {
       axios.get(process.env.REACT_APP_SERVER_URL+'/user/byemail/' + email).
        then(Response => {
          if (Response.data) {
            window.sessionStorage.setItem('userID', Response.data._id);
            setLoggedIn(true);
  
          }
          else
            setMessege({ text: 'invalid details', showMessege: true })
        })
  
    }
  })

  
}


