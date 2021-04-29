import '../css/Forms.css'
import axios from 'axios'
import {useHistory } from 'react-router-dom';
import React from 'react';

export default function EditGarden() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const gardenID = window.location.toString().substring(index)
  const history = useHistory();
  const [garden, setGarden] = React.useState({ _id: '' });
  const [direction, setDirection] = React.useState("");
  const [surroundings, setSurroundings] = React.useState("")
  const [sunlight, setSunlight] = React.useState("")

  React.useEffect(() => {
    fetch('http://localhost:8080/garden/find/' + gardenID)
      .then(response => response.json()).then(
        data => {
          setGarden(data);
          setDirection(data.direction);
          setSurroundings(data.surrounding);
          setSunlight(data.directSun)
        }
      )
  }, []);
  const gardenName = garden.name

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
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"><br />
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Edit Garden </h1>
              </div>

              <form onSubmit={(e) => {
                editGarden(e, gardenName, direction, surroundings, sunlight, gardenID)
                history.push('/mygardens')
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="name" className="fadeIn second" name="addAGarden" placeholder={gardenName} />
                <br />
                <a>
                  Which direction your garden is facing?&nbsp;
                  <select value={direction} onChange={handleDirectionChange}>
                    <option value="south">South</option>
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
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Save Changes</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/mygardens')}><span>Cancel</span></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

function editGarden(e, gardenName, direction, surroundings, sunlight, gardenID) {

  e.preventDefault();

  let name;
  if (document.getElementById('name').value.length == 0) name = gardenName;
  else name = document.getElementById('name').value;

  const newGarden = {
    name: name,
    id: gardenID,
    direction: direction,
    directSun: sunlight,
    surroundings: surroundings,
  }

  axios.put('http://localhost:8080/garden/', newGarden);
}