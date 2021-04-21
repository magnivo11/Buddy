import '../css/Forms.css'
import axios from 'axios'
import{ Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';
import DataContext from '../DataContext';


export default function EditUser(){

   const data=React.useContext(DataContext);
  const userId= window.sessionStorage.getItem('userID');

  const [user,setUser]=React.useState({_id:''});

   React.useEffect(() => {
    fetch('http://localhost:8080/user/'+userId)
      .then(response => response.json()).then(
        data => {
          setUser(data);
        }
      )
  }, []);
 
  
  const[info,setInfo]=React.useState({showMessege:false,redirectToGardens:false});
if(!info.redirectToGardens)
   return (
    <div  style={{fontFamily: "Open Sans"}}>
    <section id="hero" className="d-flex align-items-center" >
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              <br/>
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Edit My Profile </h1> 
                {info.showMessege? <div>this email is  taken, please use a different one</div>:null }
              </div><br/>
              <form  onSubmit={(e)=>{editUser(e,data,user.name,user.lastName,user.email,user.password,userId,setInfo)}}>
                <input type="text" id="first_name" className="fadeIn second"  placeholder={'First Name: '+user.name} />
                <input type="text" id="last_name" className="fadeIn second"  placeholder={'Last Name: '+user.lastName}  />
                <input type="text" id="email" className="fadeIn second"  placeholder={'Email: '+user.email} />
                <input type="text" id="password" className="fadeIn third"  placeholder={'Password'} />
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
   
function editUser(e,data,oldFirstName, oldLastName, oldEmail,oldPassword,userId,setInfo){

  e.preventDefault();
    var firstName;
    var lastName;
    var email;
    var password;
    if (document.getElementById('first_name').value.length===0) firstName= oldFirstName;
      else firstName=document.getElementById('first_name').value;
    if (document.getElementById('last_name').value.length===0) lastName= oldLastName;
      else lastName=document.getElementById('last_name').value;
    if (document.getElementById('email').value.length===0) email= oldEmail;
      else email=document.getElementById('email').value;
    if (document.getElementById('password').value.length===0) password= oldPassword;
      else password=document.getElementById('password').value;


    axios.get('http://localhost:8080/user/byemail/'+email).then((Response)=>{
      if(Response.data){
        if(Response.data._id!==userId) {
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
        /////////////  forceRender renders app  /////////////
             data.forceRender(!data.render);
            setInfo({redirectToGardens:true})
            
        }
    }});
    
}
