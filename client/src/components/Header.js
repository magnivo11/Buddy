import {Link} from "react-router-dom"
import { TextField } from '@material-ui/core';

export default function Header(){
    return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      
        <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
            
            <h1 className="logo mr-auto" style={{marginRight: '100%'}}><a href="index.html">Little Buddy</a></h1>
            <nav className="nav-menu d-none d-lg-block">
              <ul>
              <input placeholder = "Search" className="form-control"></input>


                <a href="#" className="nav-item nav-link" style={{color:'white'}}><i className="fa fa-envelope" /></a>
                <a href="#" className="nav-item nav-link"><i className="fa fa-bell" /></a>
                <Link to="/login" className="nav-item nav-link"><i className="fa fa-user-circle" /></Link>
                       
              </ul>
            </nav>
            </div>
            </header>
         
            </div>   
);
    }
     
