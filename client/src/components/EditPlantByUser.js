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
  const [plant, setPlant] = React.useState({});
  const [selected,setSelected]=React.useState('Change species')
  const history = useHistory();
  const [growthStatus, setGrowthStatus] = React.useState("")
  const handleStatusChange = (event) => {
    event.preventDefault();
    setGrowthStatus(event.target.id);
  }

//Get Admin plants from server
  const [plants,setPlants]=React.useState([])
  let plantsInfo=[];

  
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/plant/' + plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
        }
      )
  }, []);

  React.useEffect(() => {
          axios.get(process.env.REACT_APP_SERVER_URL+'/plant/admin').then((Response)=> {
            if(plants.length!=Response.data.length)
            {
              Response.data.forEach(singlePlant => {
                if(plant.species!=singlePlant.species) //eliminate the current species from plants list
                plantsInfo.push({label:singlePlant.species, value:singlePlant.species})
              });
            setPlants(plantsInfo);
            }
        })
        }
, []);



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
              <h2 style={{fontSize: '25px', color:'#51361A'}} >{plant.species} </h2> 

              </div>
              <form name='plantUserForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              editPlant(e,plantID,selected,growthStatus,plant.GardenID,history)}}>

                  <div style={{fontSize:'14px', width:'400px',marginLeft:'80px'}}>

                   <VirtualizedSelect
                name="Species"
                placeholder= {selected}
                value={plants.value}
                options={plants}
                onChange={(e)=>{
                  setSelected(e.value)}} />
                  </div> <br></br>
                <p style= {{fontSize: '14px'}} >Change plant's growth stage:</p>

                <label className="radio-inline" >
                {plant.growthStatus==="Seed" ? <input value="Seed" type="image" src={stage1} style={{borderBottom: "2px solid #000"}}  width={40} id="Seed" name="growthStatus" onClick={handleStatusChange} />:
                  <input value="Seed" type="image" src={stage1}   width={40} id="Seed" name="growthStatus" onClick={handleStatusChange} />}<br />Seed
               </label>
                <label className="radio-inline" >
                  {plant.growthStatus==="Seedling" ? <input value="Seedling" type="image" src={stage2}   style={{borderBottom: "2px solid #000"}}width={40} id="Seedling" name="growthStatus" onClick={handleStatusChange} />:
                  <input value="Seedling" type="image" src={stage2} width={40} id="Seedling" name="growthStatus" onClick={handleStatusChange} />}<br />Seedling
               </label>
                <label className="radio-inline">
                {plant.growthStatus=="Vegetative" ? <input value="Vegetative" type="image" src={stage3}  style={{borderBottom: "2px solid #000"}} width={40} id="Vegetative" name="growthStatus" onClick={handleStatusChange} />:
                  <input value="Vegetative" type="image" src={stage3} width={40} id="Vegetative" name="growthStatus" onClick={handleStatusChange} />}<br />Vegetative
               </label>
                <label className="radio-inline" >
                {plant.growthStatus=="Flowering" ? <input value="Flowering" type="image" src={stage4} style={{borderBottom: "2px solid #000"}} width={40} id="Flowering" name="growthStatus" onClick={handleStatusChange} />:
                  <input value="Flowering" type="image" src={stage4} width={40} id="Flowering" name="growthStatus" onClick={handleStatusChange} />}<br />Flowering
                  </label>
                <label className="radio-inline">
                {plant.growthStatus=="Ripening" ? <input value="Ripening" type="image" src={stage4} style={{borderBottom: "2px solid #000"}} width={40} id="Ripening" name="growthStatus" onClick={handleStatusChange} />:
                  <input value="Ripening" type="image" src={stage4} width={40} id="Ripening" name="growthStatus" onClick={handleStatusChange} />}<br />Ripening
                  </label>
                    <br></br>
                    <br></br>

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
  

   

function editPlant(e,plantID,selected,growthStatus,GardenID,history){
  e.preventDefault();

 const newPlant={
  _id:plantID,
  species:selected,
  growthStatus:growthStatus,
  GardenID: GardenID
 }
 axios.put(process.env.REACT_APP_SERVER_URL+'/plant/byuser/',newPlant);
 history.push('/plant/' + plantID)
}