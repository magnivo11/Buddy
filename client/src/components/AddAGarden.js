import '../css/Forms.css'
import axios from 'axios'
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddAGarden() {
  const userId = window.sessionStorage.getItem('userID');
  const [direction, setDirection] = React.useState("south")
  const [surroundings, setSurroundings] = React.useState("indoor")
  const [sunlight, setSunlight] = React.useState(false)


  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  }
  const handleSurroundingsChange = (event) => {
    setSurroundings(event.target.value);
  }
  const handleSunlightChange = (event) => {
    setSunlight(event.target.value);
  }
  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div style={{ textAlign: 'center' }} className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <br></br>
                <h1><small  style={{color: '#51361A', fontWeight:'bold'}}>Add A Garden</small> </h1>
              </div>

              <form onSubmit={(e) => {
                addAGarden(e, direction, surroundings, sunlight, userId)
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="name" className="fadeIn second" name="addAGarden" placeholder="Garden Name" />
                <br />
                <a>
                  Which direction your garden is facing?&nbsp;
                  <select value={direction} onChange={handleDirectionChange}>
                    <option value="south" >South</option>
                    <option value="north">North</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </a>
                <br /><br />
                <a>
                  Where is it located?&nbsp;
                  <select value={surroundings} onChange={handleSurroundingsChange}>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>

                  </select>
                </a>
                <br /><br />

                <a>
                  Sun exposure&nbsp;
                  <select value={sunlight} onChange={handleSunlightChange}>
                    <option value={true}>Direct sunlight</option>
                    <option value={false}>Indirect sunlight</option>
                  </select>
                </a>
                <br /><br />

                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => window.location='/mygardens'}><span>Cancel</span></button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  );

}




function addAGarden(e, direction, surroundings, sunlight, userId) {

  e.preventDefault();
  const name = document.getElementById('name').value;
  if (checkRequired('name')) {
    const newGarden = {
      name: camelize(name),
      direction: direction,
      directSun: sunlight,
      surroundings: surroundings,
      userID: userId
    }
    axios.post(process.env.REACT_APP_SERVER_URL+'/garden/', newGarden);
    window.location='/mygardens';
  }
}
function checkRequired(field) {
  if (document.getElementById(field).value.length == 0) {
    toast(camelize(field) + " is required");
    return false;
  }
  return true;
}

function camelize(str) {
  const field = str.replaceAll('_', ' ');
  return field.charAt(0).toUpperCase() + field.slice(1);
}