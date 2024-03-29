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

  const buttonOnClick = e => {
    document.getElementById('file-input').click()
  };  

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
  
  const[info,setInfo]=React.useState({showMessege:false});
   return (
    <div  style={{fontFamily: "Open Sans"}}>
         <section id="hero"   style={{ overflow: 'scroll' }}>
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent" >
              <div className="fadeIn first">
              <br/>
                <h1 style= {{fontSize: '30px', color:'#51361A'}}>Edit My Profile </h1> 
               
                {info.showMessege? <div>this email is  taken, please use a different one</div>:null }
              </div><br/>
              <form  onSubmit={(e)=>{editUser(e,data,user.firstName,user.lastName,user.email,user.description ,user.password,user.photoID,userId,setInfo,FileName)}}>
              {user.photoID?
                <img style={{width:'150px',height:'150px',objectFit: "cover"}} src={process.env.REACT_APP_SERVER_URL+`/photo/find/${user.photoID}`} alt="profile" className=" rounded-circle" />:
                <img  style={{width:'150px',objectFit:"cover"}} src={userPhoto} alt="profile" className=" rounded-circle" />}
               
              <div className="form-group" >
                    <button style={{ width: '120px', background: 'rgb(205, 164, 94)', margingRight: '10px'}} type="button" className="button" onClick={buttonOnClick}><span>Select Photo</span></button>
                    <input id="file-input" name='link' className="form-control-file" type="file" name="name" onChange={onChangeFile} style={{display: "none"}} />        
                    {/* <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input> */}
                  </div>
                <input type="text" id="first_name" className="fadeIn second" placeholder={'First Name: '+user.firstName} />
                <input type="text" id="last_name" className="fadeIn second"  placeholder={'Last Name: '+user.lastName}  />
                <input type="text" id="email" className="fadeIn second"  placeholder={'Email: '+user.email} />
                <input type="text" id="description" className="fadeIn second"  placeholder={'Description: '+user.description} />
                <input type="text" id="password" className="fadeIn third"  placeholder={'Password'} />
            
                <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>&nbsp;
                <button style={{width:'120px',background: '#84996f'}}className="button" type="button" onClick={()=>window.location='/mygardens'}><span>Cancel</span></button>

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
  if (FileName!="")
{
  var formData = new FormData();
  formData.append('link', FileName );
  formData.append('type', "user");
  formData.append('ownerID',userId);

  axios.post(process.env.REACT_APP_SERVER_URL+'/photo/upload', formData);
} 
 
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
            password: checkField(oldPassword,'password'),
             }

        axios.put(process.env.REACT_APP_SERVER_URL+'/user/',newUser).then(response =>{
          /////////////  forceRender renders app  /////////////
               data.forceRender(!data.render);
              setInfo({redirectToGardens:true})
              sleep(5000).then(() => {
                window.location='/profile/' + userId});
        });
            
        }
    }});
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
     axios.delete(process.env.REACT_APP_SERVER_URL+'/photo/', { data: { photoID: beforeUpdate} })
    }
  return updated;
}

function sleep (time) {
return new Promise((resolve) => setTimeout(resolve, time));
}
