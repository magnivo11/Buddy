import '../css/Forms.css'
import axios from 'axios'
import{ useHistory} from 'react-router-dom';
import React from 'react';
import DataContext from '../DataContext';


export default function EditUser(){

   const data=React.useContext(DataContext);
  const userId= window.sessionStorage.getItem('userID');
  const history = useHistory();

  const [user,setUser]=React.useState({_id:''});

   React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/user/'+userId)
      .then(response => response.json()).then(
        data => {
          setUser(data);
        }
      )
  }, []);
 
  
  const[info,setInfo]=React.useState({showMessege:false});
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
              <form  onSubmit={(e)=>{editUser(e,data,user.firstName,user.lastName,user.email,user.description ,user.password,userId,setInfo,history)}}>
                <input type="text" id="first_name" className="fadeIn second"  placeholder={'First Name: '+user.firstName} />
                <input type="text" id="last_name" className="fadeIn second"  placeholder={'Last Name: '+user.lastName}  />
                <input type="text" id="email" className="fadeIn second"  placeholder={'Email: '+user.email} />
                <input type="text" id="description" className="fadeIn second"  placeholder={'Description: '+user.description} />
                <input type="text" id="password" className="fadeIn third"  placeholder={'Password'} />
                <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>&nbsp;
                <button style={{width:'120px',background: '#84996f'}}className="button" onClick={()=>history.push('/mygardens')}><span>Cancel</span></button>

              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
   
function editUser(e,data,oldFirstName, oldLastName, oldEmail,oldDescription, oldPassword,userId,setInfo,history){
  e.preventDefault();

  const email = checkField(oldEmail,'email');
    axios.get(process.env.REACT_APP_SERVER_URL+'/user/byemail/'+email).then((Response)=>{
      if(Response.data){
        if(Response.data._id!==userId) {
          setInfo({showMessege:true})}
        else{
          const newUser= { 
            id:userId,
            firstName:checkField(oldFirstName,'first_name'),
            lastName: checkField(oldLastName,'last_name') ,
            email:email,
            description:checkField(oldDescription,'description'),
            password: checkField(oldPassword,'password')
             }
        axios.put(process.env.REACT_APP_SERVER_URL+'/user/',newUser)
        /////////////  forceRender renders app  /////////////
             data.forceRender(!data.render);
            setInfo({redirectToGardens:true})
            
        }
    }});
    history.push('/profile/' + userId)
  }
function checkField(beforeUpdate,field){
  let updated="";
  if (document.getElementById(field)== null) updated = beforeUpdate;
  else updated = document.getElementById(field).value;
  return updated;
}