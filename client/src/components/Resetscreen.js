 import '../css/Forms.css'
import '../css/Buttons.scss'
import axios from 'axios'
import logo from '../Images/Logos/full logo in circle@4x.png';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';

export default function Resetscreen() {

    const [info, setInfo] = React.useState({ showMessege: false, message: '' });
    const [display, setDisplay] = React.useState(false);
    const [id,setID] = React.useState();
    var index = window.location.toString().lastIndexOf('/') + 1
    const token = window.location.toString().substring(index)
 
    React.useEffect(() => {
        axios.get('http://localhost:8080/user/token/'+token).then((Response) => {
            console.log(Response);
        if (Response.data[0]._id) {
                 setDisplay(true);
                setID(Response.data[0]._id);
            }
        });
    }, []);

    if (display) {
        return (
            <div style={{ fontFamily: "Open Sans" }}>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
                        <div className="wrapper fadeInDown">
                            <div id="formContent">
                                <div className="fadeIn first">
                                    <img src={logo} id="icon" alt="Welcome Buddy" />
                                    <h1 style={{ fontSize: '35px', color: '#51361A' }}>Change your password </h1>
                                    {info.showMessege ? <div>{info.message}</div> : null}
                                </div>
                                <form onSubmit={(e) => { changePassword(e) }}>
                                    <input type="password" id="password" className="fadeIn second" name="reset" placeholder="Password" />
                                    <input type="password" id="confirmPassword" className="fadeIn third" name="reset" placeholder="confirm Password" />
                                    <br></br>
                                    <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Change</span></button><br></br>
                                    <Link style={{ color: '#51361A' }} className="underlineHover" to="/login">back to Login</Link>
                                    <br></br><br></br>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    else
    {
        return('Page not found 404');
    }
    function changePassword(e) {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        e.preventDefault();
        if (checkRequired('password') && checkRequired('confirmPassword') && confirmPassword == password) {
             axios.put('http://localhost:8080/user/changepass/', { password: password , id:id}).
                then((Response) => {
                    if (Response.data=="changed") {
                        setInfo({ showMessege: true, message: 'Changed!' })
                    }
                    else {
                        setInfo({ showMessege: true, message: 'Try again!' })
                    }
                })
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
        const field = str.replaceAll('_', ' ');
        return field.charAt(0).toUpperCase() + field.slice(1);
    }

}