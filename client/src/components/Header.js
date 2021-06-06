import { FaTimes } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import '../css/Header.css';
import React from 'react';
import nameLogo from '../Images/Logos/black and white logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext';

export default function Header() {
  const data=React.useContext(DataContext);
  const userIDfromSession = window.sessionStorage.getItem('userID');
  const [currentUser, setUser] = React.useState({ _id: null });
  const [clicked, setClicked] = React.useState(false);

  const logOut = (e) => {
    if (window.confirm('Are you sure you want to log out?')){
    if (userIDfromSession)
      window.sessionStorage.removeItem('userID');
    window.location='/login';
    }

  }
  const doSearch = (e) => {
    if (e.target.value === "") {
      window.location='/mygardens';
    }
    else {
      window.location='/biblesearch?q=' + e.target.value;
    }
  }
  React.useEffect(() =>
    axios.get(process.env.REACT_APP_SERVER_URL+'/user/' + userIDfromSession).then((Response) => {
      if (Response.data) {
        if (currentUser._id !== Response.data._id || currentUser.firstName !== Response.data.firstName || currentUser.lastName !== Response.data.lastName) {
          setUser(Response.data);
        }
      }
    }), [])

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
          <Link to="/mygardens"><img src={nameLogo} width="70px" className="logo mr-auto" /> </Link>
          {/* <h1 className="logo mr-auto" style={{ marginRight: '100%' }}><Link to="/mygardens">Buddy</Link></h1> */}
          <div className="mobile-nav-toggle" onClick={handleClick}>
          {/* mobile header */}
          {clicked? <FaTimes/> : <FaBars/>}
          </div>
          {clicked && <nav className= "nav-menu mobile-nav-toggle">
            <ul className="active" style={{color:'white'}}>
              <input type="text" id="mySearch" placeholder="Search in bible" onChange={doSearch} className="form-control" />
              <div className='header-mobile'>
              <Link to="/mygardens" className="nav-item nav-link header-mobile-link">My Gardens </Link>
              <Link to="/newsfeed" className="nav-item nav-link header-mobile-link" style={{padding:"5%"}} >News Feed </Link>
              <Link to={`/profile/${userIDfromSession}`} className="nav-item nav-link" >My Profile </Link>
              <Link to="/plantsbible" className="nav-item nav-link"style={{padding:"5%"}} >The Plant Bible</Link>
              <Link to="/aboutus" className="nav-item nav-link header-mobile-link" style={{padding:"5%"}}>About Us </Link>
              <Link onClick={logOut} className="nav-item nav-link">Log out </Link>
              <Link to="/notifications"  className="nav-item nav-link" style={{padding:"5%"}}>Notifications
               {data.newNotifications!=0&&<span style={{ position : 'absolute', top: '-10px', right: '-10px',padding: '5px 10px',borderRadius:'50%', background: 'red', color: 'white'}}>{data.newNotifications}</span>}</Link>
              <Link to="/edituser" className="nav-item nav-link">Edit my profile</Link>
              </div></ul>
          </nav>}
          {/* website header */}
          <nav className= "nav-menu header-large-screen">
            <ul className="active">
              <input type="text" id="mySearch" placeholder="Search in bible" onChange={doSearch} className="form-control" />
              <li><Link to="/mygardens">My Gardens </Link></li>
              <li><Link to="/newsfeed">News Feed </Link></li>
              <li><Link to={`/profile/${userIDfromSession}`}>My Profile </Link></li>
              <li><Link to="/plantsbible">The Plant Bible</Link></li>
              <li><Link to="/aboutus">About Us</Link></li>

              <li></li>
              <Link onClick={logOut} className="nav-item nav-link"><i className="fa fa-key" /></Link>
              <Link to="/notifications"  className="nav-item nav-link"><i className="fa fa-bell" />
               {data.newNotifications!=0&&<span style={{ position : 'absolute', top: '-10px', right: '-10px',padding: '5px 10px',borderRadius:'50%', background: 'red', color: 'white'}}>{data.newNotifications}</span>}</Link>
              <Link to="/edituser" className="nav-item nav-link"><i className="fa fa-cog" /></Link>
              <li style={{ color: "white" }}>Hey {currentUser.firstName}</li>
            </ul>
          </nav>
        </div>
      </header>

    </div>
  );
}

