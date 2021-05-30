import '../css/Forms.css'
import '../css/Buttons.scss'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import logo from '../Images/Logos/full logo in circle@4x.png';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {
  const [FileName, setFileName] = React.useState("");

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  }
  const [info, setInfo] = React.useState({ showMessege: false, redirectToLogin: false, message: '' });
  if (!info.redirectToLogin)
    return (
      <div style={{ fontFamily: "Open Sans" }}>
        <section id="hero" className="d-flex align-items-center"style={{overflow:'scroll'}}>
          <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100} >
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="fadeIn first">
                  <img src={logo}  style={{paddingTop:"2%"}}id="icon" alt="Welcome Buddy" />
                  <h1><small  style={{color: '#51361A', fontWeight:'bold'}}>Welcome to the family!</small> </h1>
                  {info.showMessege ? <div>{info.message}</div> : null}
                </div>
                <form encType="multipart/form-data" onSubmit={(e) => { register(e, setInfo,FileName) }}>
                  <input type="text" id="first_name" className="fadeIn second" name="register" placeholder="First name" />
                  <input type="text" id="last_name" className="fadeIn second" name="register" placeholder="Last name" />
                  <input type="text" id="email" className="fadeIn second" name="register" placeholder="Email Address" />
                  <input type="password" id="password" className="fadeIn third" name="register" placeholder="Password" />
                  <input type="text" id="description" className="fadeIn second" name="register" placeholder="A few words about you" />
                  <div className="form-group">
                    <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input>
                  </div>
                  <br></br>
                  <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Register</span></button>
                  <div id="formFooter">
                    <Link style={{ color: '#51361A' }} className="underlineHover" to="/login">Already a member? Login!</Link>
                  </div>
                  <br></br><br></br>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  else {
    return (<Redirect to="/login" />);
  }
}

function register(e, setInfo,FileName) {

  e.preventDefault();
  var formData = new FormData();
  formData.append('link', FileName);
  formData.append('type', "user");
 

 axios.post('http://localhost:8080/photo/upload', formData);

  if (checkRequired('first_name') && checkRequired('last_name') &&
    checkRequired('email') && checkRequired('description') && checkRequired('password')) {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById('email').value)))
      setInfo({ showMessege: true, message: 'invalid email adress' })
    else {
      axios.get('http://localhost:8080/user/byemail/' + document.getElementById('email').value).
        then((Response) => {
          if (Response.data) {
            setInfo({ showMessege: true, message: 'this email is  taken, please use a different one' })
          }
          else {
            const newUser = {
              firstName: camelize(document.getElementById('first_name').value),
              lastName: camelize(document.getElementById('last_name').value),
              email: document.getElementById('email').value,
              description: document.getElementById('description').value,
              password: document.getElementById('password').value,
              photoID: FileName.name
            }
            axios.post('http://localhost:8080/user/', newUser)
            setInfo({ redirectToLogin: true })
          }
        })
    }
  }
}
function checkRequired(field) {
  if (document.getElementById(field).value.length == 0) {
    toast(camelize(field) + " is required");
    return false;
  }
  return true;
}
function camelize(str) {
  const field= str.replaceAll('_', ' ');
  return field.charAt(0).toUpperCase()+field.slice(1);
}