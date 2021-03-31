import '../css/Forms.css'
import axios from 'axios'
import DataContext from '../DataContext';
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

export default function EditUser(){
  //const user=React.useContext(DataContext);
  const userId= window.sessionStorage.getItem('userID');
  const [user,setUser]=React.useState({_id:''});
  if(user._id!=userId)
  axios.get('http://localhost:8080/user/'+userId).then((Response)=> {
    if(Response.data){

    if(user._id!=Response.data._id)
    {
      setUser(Response.data);
    }
  }
  })

  ;
  const[info,setInfo]=React.useState({showMessege:false,redirectToGardens:false});
if(!info.redirectToGardens)
  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <img src={logo} id="icon" alt="Welcome Buddy" />
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Edit My Profile </h1> 
                {info.showMessege? <div>this email is  taken, please use a different one</div>:null }
              </div>
              <form  onSubmit={(e)=>{editUser(e,user.name,user.lastName,user.email,user.password,userId,setInfo)}}>
                <input type="text" id="first_name" className="fadeIn second"  placeholder={user.name} />
                <input type="text" id="last_name" className="fadeIn second"  placeholder={user.lastName}  />
                <input type="text" id="email" className="fadeIn second"  placeholder={user.email} />
                <input type="text" id="password" className="fadeIn third"  placeholder={user.password} />
                <input type="submit" className="fadeIn fourth" value="Save"/><br/>

              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  else{  return(<Redirect  to={`/mygardens`}/>);}
  }
   
function editUser(e,oldFirstName, oldLastName, oldEmail,oldPassword,userId,setInfo){
  console.log(oldFirstName+oldLastName+oldEmail+oldPassword);

  e.preventDefault();
    var firstName;
    var lastName;
    var email;
    var password;
    if (document.getElementById('first_name').value.length==0) firstName= oldFirstName;
      else firstName=document.getElementById('first_name').value;
    if (document.getElementById('last_name').value.length==0) lastName= oldLastName;
      else lastName=document.getElementById('last_name').value;
    if (document.getElementById('email').value.length==0) email= oldEmail;
      else email=document.getElementById('email').value;
    if (document.getElementById('password').value.length==0) password= oldPassword;
      else password=document.getElementById('password').value;

    console.log(firstName+lastName+email+password);

    axios.get('http://localhost:8080/user/byemail/'+email).then((Response)=>{
      if(Response.data){
        if(Response.data._id!=userId) {
          setInfo({showMessege:true})}
        else{
          const newUser= { 
            id:userId,
            name:firstName,
            lastName: lastName ,
            email:email,
            password: password
             }
        axios.put('http://localhost:8080/user/',newUser)
          setInfo({redirectToGardens:true})
        }
    }});
    
}
