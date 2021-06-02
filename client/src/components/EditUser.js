import '../css/Forms.css'
import axios from 'axios'
import React from 'react';
import DataContext from '../DataContext';
import userPhoto from '../Images/user.png'


export default function EditUser(){

   const data=React.useContext(DataContext);
  const userId= window.sessionStorage.getItem('userID');

  const [user,setUser]=React.useState({_id:''});
  const [FileName, setFileName] = React.useState("");

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  }

   React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/user/'+userId)
      .then(response => response.json()).then(
        data => {
          setUser(data);
        }
      )
  }, []);
 console.log(user)
  
  const[info,setInfo]=React.useState({showMessege:false});
   return (
    <div  style={{fontFamily: "Open Sans"}}>
         <section id="hero"   style={{ overflow: 'scroll' }}>
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent" >
              <div className="fadeIn first">
              <br/>
                <h1 style= {{fontSize: '35px', color:'#51361A'}}>Edit My Profile </h1> 
                {user.photoID?
                <img style={{width:'35%'}} src={`http://localhost:8080/photo/find/${user.photoID}`} alt="profile" className="img-lg rounded-circle mb-3" />:
                <img style={{width:'75%'}} src={userPhoto} alt="profile" className="img-lg rounded-circle mb-3" />}
               
                {info.showMessege? <div>this email is  taken, please use a different one</div>:null }
              </div><br/>
              <form  onSubmit={(e)=>{editUser(e,data,user.firstName,user.lastName,user.email,user.description ,user.password,user.photoID,userId,setInfo,FileName)}}>
              <div className="form-group" >
                    <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input>
                  </div>
                <input type="text" id="first_name" className="fadeIn second"  placeholder={'First Name: '+user.firstName} />
                <input type="text" id="last_name" className="fadeIn second"  placeholder={'Last Name: '+user.lastName}  />
                <input type="text" id="email" className="fadeIn second"  placeholder={'Email: '+user.email} />
                <input type="text" id="description" className="fadeIn second"  placeholder={'Description: '+user.description} />
                <input type="text" id="password" className="fadeIn third"  placeholder={'Password'} />
            
                <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>&nbsp;
                <button style={{width:'120px',background: '#84996f'}}className="button" onClick={()=>window.location='/mygardens'}><span>Cancel</span></button>

              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
   
function editUser(e,data,oldFirstName, oldLastName, oldEmail,oldDescription, oldPassword,oldPhotoID,userId,setInfo,FileName){
  e.preventDefault();
  var formData = new FormData();
  formData.append('link', FileName);
  formData.append('type', "user");
 

 axios.post('http://localhost:8080/photo/upload', formData);

  const updatedPhotoFile= checkState(oldPhotoID,FileName);
  const email = checkField(oldEmail,'email');

    axios.get(process.env.REACT_APP_SERVER_URL+'/user/byemail/'+email).then((Response)=>{
      if(Response.data){
        console.log(Response.data);
        if(Response.data._id!==userId) {
          setInfo({showMessege:true})}
        else{
          const newUser= { 
            id:userId,
            firstName:checkField(oldFirstName,'first_name'),
            lastName: checkField(oldLastName,'last_name') ,
            email:email,
            description:checkField(oldDescription,'description'),
            password: checkField(oldPassword,'password'),
            photoID:updatedPhotoFile,
             }

        axios.put(process.env.REACT_APP_SERVER_URL+'/user/',newUser)
        /////////////  forceRender renders app  /////////////
             data.forceRender(!data.render);
            setInfo({redirectToGardens:true})
            
        }
    }});
    window.location='/profile/' + userId;
  }
  function checkField(beforeUpdate,field){
    let updated="";
    if (document.getElementById(field).value.length==0) updated = beforeUpdate;
    else updated = document.getElementById(field).value;
    return updated;
  }
function checkState(beforeUpdate,state) {
  let updated="";
  if (state== "") updated = beforeUpdate;
  else {
    updated = state.name;
    axios.delete('http://localhost:8080/photo/', { data: { photoID: beforeUpdate} })
  }
  return updated;
}