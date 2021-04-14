import '../css/AddForms.css'
import '../css/AddAPlant.css';
import axios from 'axios'
import{Redirect,useHistory} from 'react-router-dom';
 import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import stage1 from '../Images/IconStages/stage 1.jpg';
import stage2 from '../Images/IconStages/stage 2.jpg';
import stage3 from '../Images/IconStages/stage 3.jpg';
import stage4 from '../Images/IconStages/stage 4.jpg';
import stage5 from '../Images/IconStages/stage 5.jpg';
 

export default function AddAPlantByUser(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const [selected,setSelected]=React.useState('Select plant')
  const[plantAdded,setPlantAdded]=React.useState(false)
   const history = useHistory();
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
  if(!plantAdded){

  return (
    <div style={{fontFamily: "Open Sans"}}>
      <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.0/dist/react-select.css"></link>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />   
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"> <br></br>
                <h1 style={{fontSize: '35px', color:'#51361A'}} >Add A Plant </h1> <br></br>
              </div> 
              <form name='plantUserForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
                 addAPlant(e,gardenID,selected)
                 history.push('/singleGarden/'+gardenID)}}>
                <div style={{fontSize:'14px', width:'400px',marginLeft:'80px'}}>
                  <VirtualizedSelect 
                    name="Species"
                    placeholder = {selected}
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
                  <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Add</span></button>
               </form>  
              </div>
           </div>
        </div>
      </section>
    </div>
  );}
  else{
    return(<Redirect to={`/singlegarden/${gardenID}`}/>);
  
  }
}
   

function addAPlant(e,gardenID,selected){
  e.preventDefault();
  const form = document.forms.plantUserForm;
  const growthStatus = form.elements.growthStatus;
  var status;

  for(var i = 0; i <growthStatus.length; i++){
  if(growthStatus[i].checked){
  status=growthStatus[i].id;}}

 const newPlant={
  species:selected,
  isUserPlant:true,
  growthStatus:status,
  GardenID:gardenID
 }
 
 axios.post('http://localhost:8080/plant/ByUser',newPlant);
}