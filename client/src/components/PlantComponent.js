import { Link } from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import statusGreen from '../Images/status/green.jpg';
import statusBlue from '../Images/status/statusBlue.png';

import React from 'react';
import axios from 'axios'


export default function PlantComponent({ plantName, plantid, plantsensorid }) {


    const StatusColor = () => {
        var status1 = 0;
        var status2 = 0;
        var status3 = 0;

        const [sensor, setSensor] = React.useState();
        React.useEffect(() => {
            if (plantsensorid != null) {
                var url = 'http://localhost:8080/sensor/' + plantsensorid;
                axios.get(url).then((Response) => {
                    if (!sensor) {
                        setSensor(Response.data);
                    }
                })
            }
        }, []);
        if (sensor != null && sensor.light.length > 15) {

            for (let i = 0; i < 10; i++) {
                status1 += sensor.light[i].curLight;
                status2 += sensor.temperature[i].curTemp;
                status3 += sensor.soilMoisture[i].curMoist;

            }

            if ((status1 / 10) > 50 && ((status1 / 10) < 60) || (status2 / 10) > 20 && (status2 / 10) < 30 || (status3 / 10) > 20 && (status2 / 10) < 50) {
                return statusGreen;
            }
            if ((status1 / 10) >= 60 && ((status1 / 10) <= 80) || (status1 / 10) >= 40 && ((status1 / 10) <= 50) || (status2 / 10) >= 30 && (status2 / 10) <= 40 || (status2 / 10) >= 15 && (status2 / 10) <= 20 || (status3 / 10) > 50 && (status2 / 10) < 100) {
                return statusYellow;
            }
            else {
                return statusRed;
            }


        }
        else { return statusBlue; }

    }



    return (
        <div>
            <tr>



                <Link to={`/plant/${plantid}`} >{plantName}</Link>
                <td></td>
                <td><img src={StatusColor()}
                    width={"30px"}></img></td>
                <td></td>


            </tr>
        </div>
    );



}