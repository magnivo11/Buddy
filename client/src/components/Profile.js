import DataContext from '../DataContext';
import React from 'react';
import{Link, Redirect} from 'react-router-dom';
import axios from 'axios';


export default function Profile(){

  const userIDfromSession= window.sessionStorage.getItem('userID');
  const[redirectToProfile,setRedirectToProflie]=React.useState(false);
  const [currentUser,setUser]=React.useState({_id:null});
  axios.get('http://localhost:8080/user/'+userIDfromSession).then((Response)=> {
    if(Response.data){
    if(currentUser._id!=Response.data._id)
    {
      setUser(Response.data);
    }
  }
  })

if(!redirectToProfile)
    return (
      <div>
          
       <section id="hero" className="d-flex align-items-center">
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
        <div className="container" data-aos="fade-up"  >
                
                  <meta charSet="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css" />
                  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                  <style dangerouslySetInnerHTML={{__html: "\nhtml, body, h1, h2, h3, h4, h5 {font-family: \"Poppins\", sans-serif}\n" }} />
                   
                   
                   {/* Page Container */}
                 <div className="w3-container w3-content" style={{maxWidth: '1400px', marginTop: '80px'}}>    
                   {/* The Grid */}
                    <div className="w3-row" style={{ width: '80%'}}>
                  
                              <h4 className="w3-center">{currentUser.name+" "+currentUser.lastName}</h4>
                              <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                              <hr />
                              <p className="w3-center"><i className="fa fa-envelope fa-fw w3-margin-right w3-text-theme" /> {currentUser.email}</p>
                              <Link className="w3-center"  to={`/edituser/${userIDfromSession}`} onClick={()=>{setRedirectToProflie(true)}}>
                                <i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Edit My Profile</Link>

                      
                            </div>
                    </div>     
                    
                    
                  </div>
                  </section>
       </section>
       </div>
     );
   
   else{
    return(<Redirect to="/mygardens"/>)}
   }