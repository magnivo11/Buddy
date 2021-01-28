import {Link} from "react-router-dom"
import '../css/Header.css';
import { TextField } from '@material-ui/core';

export default function Header(){
    return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      
        <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
            
            <h1 className="logo mr-auto" style={{marginRight: '100%'}}><Link to="/mygardens">Little Buddy</Link></h1>
            <nav className="nav-menu d-none d-lg-block">
              <ul>
              <li></li>
              <li><Link to="/mygardens">My Gardens </Link></li>
              <li><Link to="/plantsbible">The Plant Bible</Link></li>
              <li><Link to="/aboutus" >About Us</Link></li>
              <li></li>

                <Link to="/mygardens" className="nav-item nav-link" ><i className="fa fa-leaf" /></Link>
                <Link to="/notifications" className="nav-item nav-link"><i className="fa fa-bell" /></Link>
                <Link to="/login" className="nav-item nav-link"><i className="fa fa-key" /></Link>
                <Link to="/profile" className="nav-item nav-link"><i className="fa fa-user-circle" /></Link>
                       
              </ul>
            </nav>
            </div>
            </header>
         
            </div>   
);
    }
     
