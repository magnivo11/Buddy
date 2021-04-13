import '../css/Header.css';
 import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const userIDfromSession = window.sessionStorage.getItem('userID');
  const [currentUser, setUser] = React.useState({ _id: null });
  const history = useHistory();
  const logOut = (e) => {
    if (userIDfromSession)
      window.sessionStorage.removeItem('userID');
  }
  const doSearch = (e) => {
    if (e.target.value === "") {
      history.push('/mygardens');
    }
    else {
      history.push('/biblesearch?q=' + e.target.value);
    }
  }
  axios.get('http://localhost:8080/user/' + userIDfromSession).then((Response) => {
    if (Response.data) {
      if (currentUser._id !== Response.data._id || currentUser.name!==Response.data.name || currentUser.lastName!==Response.data.lastName) {
        setUser(Response.data);

      }
    }
  })


  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo mr-auto" style={{ marginRight: '100%' }}><Link to="/mygardens">Little Buddy</Link></h1>
          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li ></li>
              <input type="text" id="mySearch" placeholder="Search in bible" onChange={doSearch} className="form-control" />
              <li><Link to="/mygardens">My Gardens </Link></li>
              <li><Link to="/plantsbible">The Plant Bible</Link></li>
              <li><Link to="/aboutus" >About Us</Link></li>

              <li></li>
              <Link to="/login" onClick={logOut} className="nav-item nav-link"><i className="fa fa-key" /></Link>
              {/* <Link to="/notifications" className="nav-item nav-link"><i className="fa fa-bell" /></Link> */}
              <Link to="/edituser" className="nav-item nav-link"><i className="fa fa-cog" /></Link>
              <li style={{ color: "white" }}>Hey {currentUser.name} {currentUser.lastName}</li>

            </ul>
          </nav>
        </div>
      </header>

    </div>
  );
}

