import '../css/Forms.css';
import '../css/Buttons.scss'
import { Link, Redirect } from 'react-router-dom';
import logo from '../Images/LB.png';
import React from 'react';
import axios from 'axios'


export default function LoginForm() {
  const [messege, setMessege] = React.useState({ text: '', showMessege: false });
  const [loggedIn, setLoggedIn] = React.useState(false);

  if (!loggedIn) {
    return (
      <div  style={{fontFamily: "Open Sans"}}>
       <section id="hero" className="d-flex align-items-center">
          <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="fadeIn first">
                    <img src={logo} id="icon" alt="Welcome Buddy" />
                    <h1 style={{ fontSize: '35px', color: '#51361A' }}>Nice to see you again! </h1>
                   {messege.showMessege ? <div>{messege.text}</div> : null}
                </div>
                <form onSubmit={(e) => { login(e, setLoggedIn, setMessege) }}>
                  <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />
                  <input  type="password" id="password" className="fadeIn third" name="login" placeholder="password" /> <br></br>
                  <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Log in</span></button><br></br>
                </form>
                <div id="formFooter">
                   <Link className="underlineHover" style={{ color: '#51361A' }} to="/register">Don't have an account? Register!</Link>
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
  axios.get('http://localhost:8080/user/byemail/' + email).
    then(Response => {
      if (Response.data)
        if (Response.data.password === password) {
          window.sessionStorage.setItem('userID', Response.data._id);
          setLoggedIn(true);
        }
        else
          setMessege({ text: 'password incorrect', showMessege: true })
      else
        setMessege({ text: 'invalid email', showMessege: true })

    })

}


