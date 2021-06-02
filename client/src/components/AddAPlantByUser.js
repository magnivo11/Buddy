import '../css/AddForms.css'
import '../css/AddAPlant.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import stage1 from '../Images/IconStages/stage 1.jpg';
import stage2 from '../Images/IconStages/stage 2.jpg';
import stage3 from '../Images/IconStages/stage 3.jpg';
import stage4 from '../Images/IconStages/stage 4.jpg';
import stage5 from '../Images/IconStages/stage 5.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddAPlantByUser() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const gardenID = window.location.toString().substring(index)
  const [selected, setSelected] = React.useState('Select plant')
  const history = useHistory();
  const [plants, setPlants] = React.useState([]);
  const [growthStatus, setGrowthStatus] = React.useState("")

  const handleStatusChange = (event) => {
    event.preventDefault();
    setGrowthStatus(event.target.id);
  }
  var plantsInfo = [];
  React.useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL+'/plant/admin').then((Response) => {
      if (plants.length != Response.data.length) {
        Response.data.forEach(plant => {
          plantsInfo.push({ label: plant.species, value: plant.species})
        });
        setPlants(plantsInfo);
      }
    })
  }, []);

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <script src="https://unpkg.com/react-image/umd/index.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.0/dist/react-select.css"></link>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"> <br></br>
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Add A Plant </h1> <br></br>
              </div>
              <form name='plantUserForm' style={{ fontSize: '10px' }} onSubmit={(e) => {
                handleStatusChange(e)
                addAPlant(e, gardenID, selected, growthStatus,history)
              }}>
                <div style={{ fontSize: '14px'}}>
                  <VirtualizedSelect
                    name="Species"
                    placeholder={selected}
                    value={plants.value}
                    options={plants}
                    onChange={(e) => {
                      setSelected(e.value)
                    }} />
                </div> <br></br>

                <p style={{ fontSize: '14px' }} >Select you plant's initial stage:</p>
                <label className="radio-inline" >
                  <input value="Seed" type="image" src={stage1} width={40} id="Seed" name="growthStatus" onClick={handleStatusChange} /><br />Seed
               </label>
                <label className="radio-inline" >
                  <input value="Seedling" type="image" src={stage2} width={40} id="Seedling" name="growthStatus" onClick={handleStatusChange} /><br />Seedling
               </label>
                <label className="radio-inline">
                  <input value="Vegetative" type="image" src={stage3} width={40} id="Vegetative" name="growthStatus" onClick={handleStatusChange} /><br />Vegetative
               </label>
                <label className="radio-inline" >
                  <input value="Flowering" type="image" src={stage4} width={40} id="Flowering" name="growthStatus" onClick={handleStatusChange} /><br />Flowering
                  </label>
                <label className="radio-inline">
                  <input value="Ripening" type="image" src={stage5} width={40} id="Ripening" name="growthStatus" onClick={handleStatusChange} /><br />Ripening
                  </label>
                <br></br>
                <br></br>
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add</span></button>&nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/mygardens')}><span>Cancel</span></button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



function addAPlant(e, gardenID, selected, growthStatus,history) {
  e.preventDefault();
  if(checkState(selected,"Species")&& checkState(growthStatus,"Growth Status")){
  console.log(growthStatus);
  const newPlant = {
    species: selected,
    isUserPlant: true,
    growthStatus: growthStatus,
    GardenID: gardenID
  }
  axios.post(process.env.REACT_APP_SERVER_URL+'/plant/ByUser', newPlant);
  window.location='/singleGarden/' + gardenID;
}
} 
function checkState(field,fieldName) {
  if (field == 'Select plant' ||field=="") {
    toast(fieldName + " is required");
    return false;
  }
  return true;
}
