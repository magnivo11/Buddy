import TextField from '@material-ui/core/TextField'
import React from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import logo from '../Images/Logos/full logo in circle@4x.png';


export default function ForgotPassword() {
    const [messege, setMessege] = React.useState({ text: '', showMessege: false });

    return (
        <div style={{ fontFamily: "Open Sans" }}>
            <section id="hero" className="d-flex align-items-center">
                <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <div className="fadeIn first">
                                <img src={logo} id="icon" alt="Welcome Buddy" />
                                <h1 style={{ fontSize: '35px', color: '#51361A' }}>Reset your password </h1>
                            </div>
                            <form onSubmit={(e) => { reset(e) }}>
                                <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />
                                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>RESET!</span></button>
                                {messege.showMessege ? <div>{messege.text}</div> : null}<br></br>
                            </form>
                            <Link style={{ color: '#51361A' }} className="underlineHover" to="/login"> Go to Login page</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>




    );

    function reset(e) {
        e.preventDefault();
        var email = document.getElementById("email").value;
        axios.post(process.env.REACT_APP_SERVER_URL+'/user/forgotPassword', { email: email }).then(Response => {
            if (Response) {
          setMessege({ text: "Email sent. Check your E-mail", showMessege: true })
    }
            else
    setMessege({ text: 'invalid email', showMessege: true })
});
    }



}


