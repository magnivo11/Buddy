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
  const [search, setSearch] = React.useState("");

  const logOut = (e) => {
    if (window.confirm('Are you sure you want to log out?')){
    if (userIDfromSession)
      window.sessionStorage.removeItem('userID');
    window.location='/login';
    }

  }
  const doSearch = (e) => {
    window.alert(e.target)
    const key = document.getElementById('mySearch').value;
    if (key === "") {
      window.location='/mygardens';
    }
    else {
      window.location='/biblesearch?q=' + key;
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
      setClicked(!clicked)
    }

    const onChange=(e)=>{
      setSearch(e.target.value)
    }
  return (
    <div style={{ fontFamily: "Open Sans" }}>
       
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <Link to="/mygardens"  style={{paddingRight: "40px"}}><img src={nameLogo} width="70px" className="logo mr-auto" /> </Link>
          {/* <h1 className="logo mr-auto" style={{ marginRight: '100%' }}><Link to="/mygardens">Buddy</Link></h1> */}
          <div className="mobile-nav-toggle" onClick={handleClick}>
          {/* mobile header */}
          {clicked? <FaTimes/> : <FaBars/>}
          </div>
          {clicked && <nav className= "nav-menu mobile-nav-toggle">
            <ul className="active" style={{color:'white'}}>
              {/* <input type="text" id="mySearch" placeholder="Search in bible" onChange={doSearch} className="form-control" /> */}
              <div class="flexContainer" style={{display: "flex"}}>
                <input type="text" id="mySearch" placeholder="Search for Plant" onChange={onChange} className="inputField form-control" style={{flex: "1"}}/>
                <Link to={`/biblesearch?q=${search}`} className="nav-item nav-link"><i className="fa fa-search" style={{textAlign: "center"}}/></Link>
              </div>
              <div className='header-mobile'>
              <Link to="/mygardens" className="nav-item nav-link header-mobile-link">My Gardens </Link>
              <Link to="/newsfeed" className="nav-item nav-link header-mobile-link" style={{padding:"5%"}} >News Feed </Link>
              <Link to={`/profile/${userIDfromSession}`} className="nav-item nav-link" >My Profile </Link>
              <Link to="/plantsbible" className="nav-item nav-link"style={{padding:"5%"}} >The Plant Bible</Link>
              <Link to="/aboutus" className="nav-item nav-link header-mobile-link">About Us</Link>
              <Link to="/notifications"  className="nav-item nav-link" style={{padding:"5%"}}>Notifications
               {data.newNotifications!=0&&<span style={{ position : 'absolute', top: '-10px', right: '-10px',padding: '5px 10px',borderRadius:'50%', background: 'red', color: 'white'}}>{data.newNotifications}</span>}</Link>
              <Link to="/edituser" className="nav-item nav-link">Edit my profile</Link>
              <Link onClick={logOut} className="nav-item nav-link" style={{padding:"5%"}}>Log out</Link>
              </div></ul>
          </nav>}
          {/* website header */}
          <nav className= "nav-menu header-large-screen">
            <ul className="active">
                <div class="flexContainer" style={{display: "flex"}}>
                    <input type="text" id="mySearch" placeholder="Search for Plant" onChange={onChange} className="inputField form-control" style={{flex: "1"}}/>
                </div>
              <li  style={{padding: '0'}}>
                <Link to={`/biblesearch?q=${search}`} className="nav-item nav-link"><i className="fa fa-search" /></Link>
              </li>
                {/* <input type="text" id="mySearch" placeholder="Search for Plant" className="form-control" />
                <button className="btn"><i className="fa fa-cog" /></button> */}
              <li><Link to="/mygardens">My Gardens </Link></li>
              <li><Link to="/newsfeed">News Feed </Link></li>
              <li><Link to={`/profile/${userIDfromSession}`}>My Profile </Link></li>
              <li><Link to="/plantsbible">The Plant Bible</Link></li>
              <li><Link to="/aboutus">About Us</Link></li>

              <li></li>
              <Link to="/notifications"  className="nav-item nav-link"><i className="fa fa-bell" />
               {data.newNotifications!=0&&<span style={{ position : 'absolute', top: '-10px', right: '-10px',padding: '5px 10px',borderRadius:'50%', background: 'red', color: 'white'}}>{data.newNotifications}</span>}</Link>
              {!currentUser.isAdmin && <Link to="/edituser" className="nav-item nav-link"><i className="fa fa-cog" /></Link>}
              {currentUser.isAdmin && <a href={process.env.REACT_APP_ANGULAR_URL} target="_blank" className="nav-item nav-link"><i className="fa fa-cog" /></a>}
              <li style={{ color: "white" }}>Hey {currentUser.firstName}</li>
              <Link onClick={logOut} className="nav-item nav-link"><i className="fa fa-sign-out" /></Link>
            </ul>
          </nav>
        </div>
      </header>

    </div>
  );
}

