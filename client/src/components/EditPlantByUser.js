import '../css/Forms.css'
import axios from 'axios'
import React from 'react';
import '../css/AddForms.css'
import '../css/AddAPlant.css'
import{ Redirect,useHistory} from 'react-router-dom';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import stage1 from '../Images/IconStages/stage 1.jpg';
import stage2 from '../Images/IconStages/stage 2.jpg';
import stage3 from '../Images/IconStages/stage 3.jpg';
import stage4 from '../Images/IconStages/stage 4.jpg';
import stage5 from '../Images/IconStages/stage 5.jpg';


export default function EditPlantByUser(){
  var index=window.location.toString().lastIndexOf('/')+1
  const plantID=window.location.toString().substring(index)
  const [selected,setSelected]=React.useState('Select plant')
  const history = useHistory();

//Get Admin plants from server
  const [plants,setPlants]=React.useState([])
  var plantsInfo=[];
  React.useEffect(() => {
    axios.get('http://localhost:8080/plant/admin').then((Response)=> {
      if(plants.length!=Response.data.length)
      {
        Response.data.forEach(plant => {
          plantsInfo.push({label:plant.species, value:plant.species})
        });
      setPlants(plantsInfo);
      }
  })},[]);



  return (
    <div  style={{fontFamily: "Open Sans"}}>

        <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.0/dist/react-select.css"></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              <br></br>
              <h1 style={{fontSize: '35px', color:'#51361A'}} >Edit Plant </h1> 

              </div>
              <form name='plantUserForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              editPlant(e,plantID,selected)
              history.push('/mygardens')}}>

                  <div style={{fontSize:'14px', width:'400px',marginLeft:'80px'}}>

                   <VirtualizedSelect
                name="Species"
                placeholder= {selected}
                value={plants.value}
                options={plants}
                onChange={(e)=>{
                  setSelected(e.value)}} />
                  </div> <br></br>
                <p style= {{fontSize: '14px'}} >Select you plant's initial stage:</p>

                  <label className="radio-inline">
                    <input type="radio" id="Seed" name="growthStatus"  />
                    <img src={stage1} width={40}></img>Seed
                  </label>
                
                  <label className="radio-inline">
                    <input type="radio" id="Seedling" name="growthStatus"  />
                    <img src={stage2} width={40}></img>Seedling
                  </label>
                  <label className="radio-inline">
                    <input type="radio" id="Vegetative" name="growthStatus"  />
                    <img src={stage3} width={40}></img>Vegetative
                  </label>
                  <label className="radio-inline">
                    <input type="radio" id="Flowering" name="growthStatus"   />
                    <img src={stage4} width={40}></img>Flowering

                  </label> <label className="radio-inline">
                    <input type="radio" id="Ripening" name="growthStatus"  />
                    <img src={stage5} width={40}></img>Ripening
                  </label>
                    <br></br>
                    <br></br>

                    <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>
              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
  

   

function editPlant(e,plantID,selected){
  e.preventDefault();
  const form = document.forms.plantUserForm;
  const growthStatus = form.elements.growthStatus;
  var status;

  for(var i = 0; i <growthStatus.length; i++){
  if(growthStatus[i].checked){
  status=growthStatus[i].id;
  }}

 const newPlant={
  id:plantID,
  species:selected,
  growthStatus:status
 }
 axios.put('http://localhost:8080/plant/byuser/',newPlant);
  
}