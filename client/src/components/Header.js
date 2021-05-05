import { FaTimes } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';


import '../css/Header.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

export default function Header() {
  const data=React.useContext(DataContext);
  const userIDfromSession = window.sessionStorage.getItem('userID');
  const [currentUser, setUser] = React.useState({ _id: null });
  const [clicked, setClicked] = React.useState(false);

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
  React.useEffect(() =>
    axios.get('http://localhost:8080/user/' + userIDfromSession).then((Response) => {
      if (Response.data) {
        if (currentUser._id !== Response.data._id || currentUser.name !== Response.data.name || currentUser.lastName !== Response.data.lastName) {
          setUser(Response.data);
        }
      }
    }), [])
    const script = document.createElement('script');
    script.type= "text/javascript";
    const handleClick=()=>{
      console.log(clicked);
      setClicked(!clicked)
    }




  return (
    <div style={{ fontFamily: "Open Sans" }}>
       
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo mr-auto" style={{ marginRight: '100%' }}><Link to="/mygardens">Buddy</Link></h1>
          <div className="mobile-nav-toggle" onClick={handleClick}>
          {!clicked? <FaTimes/> : <FaBars/>}
          </div>
          {!clicked?  <nav className= "nav-menu">
            <ul className="active">
              <input type="text" id="mySearch" placeholder="Search in bible" onChange={doSearch} className="form-control" />
              <li><Link to="/mygardens">My Gardens </Link></li>
              <li><Link to="/newsfeed">News Feed </Link></li>
              <li><Link to={`/profile/${userIDfromSession}`}>My Profile </Link></li>
              <li><Link to="/plantsbible">The Plant Bible</Link></li>
              <li></li>
              <Link to="/login" onClick={logOut} className="nav-item nav-link"><i className="fa fa-key" /></Link>
              <Link to="/notifications"  className="nav-item nav-link"><i className="fa fa-bell" />
               {data.newNotifications!=0&&<span style={{ position : 'absolute', top: '-10px', right: '-10px',padding: '5px 10px',borderRadius:'50%', background: 'red', color: 'white'}}>{data.newNotifications}</span>}</Link>
              <Link to="/edituser" className="nav-item nav-link"><i className="fa fa-cog" /></Link>
              <li style={{ color: "white" }}>Hey {currentUser.name}</li>
            </ul>
          </nav>:null}
        </div>
      </header>

    </div>
  );
}

