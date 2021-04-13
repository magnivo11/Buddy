import {Redirect,useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React from 'react'
import PlantsList from './plantsList'
import ButtonsList from './ButtonsList';

export default function SingleGarden(){
  const history = useHistory();
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const ownerID= window.sessionStorage.getItem('userID');
  const [garden,setGarden]=React.useState({_id:''});

  if(garden._id!=gardenID)
  axios.get('http://localhost:8080/garden/find/'+gardenID).then((Response)=> {
    if(Response.data){

    if(garden._id!=Response.data._id)
    {
      setGarden(Response.data);
    }
  }
  })

  const gardenName = garden.name;

 return (
  <div  style={{fontFamily: "Open Sans"}}>
    <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
            <div className="container" data-aos="fade-up"  >
              <div className="row" data-aos="fade-up" data-aos-delay={100}>
                <div className="col-lg-3">
                  <ul className="nav nav-tabs flex-column">
                      {/*Title*/}
                      <div className="section-title" >
                        <br></br>
                        <h2 style={{fontSize:'36px'}}>My Gardnes</h2>
                      </div>
                      {/*Left buttons*/}
                    <ButtonsList ownerID= {ownerID}/>
                  </ul>
               </div>
               {/*Middle part*/}  
               <div className="col-lg-9 mt-4 mt-lg-0">
                  <div className="tab-content">
                     <div>
                        <div className="section-title" >
                          <p style={{fontSize:'35px'}}>{gardenName} Garden </p>
                       </div>
                        <PlantsList gardenID={gardenID} gardenName={gardenName}/> 
                        <div className='inner' style={{display:'inline-block'}}>
                          <Link to={`/editgarden/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
                          <span style={{color:'black'}}>Edit Garden</span></Link>  &nbsp;
                          <button style={{width:'120px',background: 'white'}}className="button" type="submit"
                          onClick={()=>{
                            axios.delete('http://localhost:8080/garden/',{data:{gardenID:gardenID,userID:ownerID}})
                            history.push('/myGardens')}}> 
                          <span style={{color:'black'}} >Delete Garden</span></button>
                      </div>
                    </div>
                 </div>
               </div>      
            </div>
         </div>
       </section>
      </section>
    </div>
  );

}

