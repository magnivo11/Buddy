import {Link} from 'react-router-dom'
import React from 'react';
import { easeCubicOut } from 'd3-ease';
import tempH3 from '../../Images/notifications/temp3.jpg';
import tempH2 from '../../Images/notifications/temp2.jpg';
import tempC2 from '../../Images/notifications/temp-2.jpg';
import tempC3 from '../../Images/notifications/temp-3.jpg';

import moist3 from '../../Images/notifications/moist3.jpg';
import moist2 from '../../Images/notifications/moist2.jpg';
import moist2Minus from '../../Images/notifications/moist-2.jpg';
import moist3Minus from '../../Images/notifications/moist-3.jpg';

import light2 from '../../Images/notifications/light2.jpg';
import light3 from '../../Images/notifications/moist3.jpg';
import light2Minus from '../../Images/notifications/moist-2.jpg';
import light3Minus from '../../Images/notifications/moist-3.jpg';








export default function Notification({date,status,type,plantID,gardenName,plantSpecies}){
   
    const [message,setMessage]=React.useState([]);
    const [time,setTime]=React.useState([]);
    React.useEffect(()=> getMessage(setMessage,status,type,plantID,gardenName,plantSpecies),[])
    React.useEffect(()=> getTime(setTime,date),[])
    


    return(
        <div>
            {/* <h2 style={{fontSize:'14px'}}> {"*"}{message} </h2>
            <h2 style={{fontSize:'10px'}}>  {"   "+time+" min ago"}</h2>
            <br/> */}
              <div className="notificationBack"  style={{ fontFamily: "Open Sans" }}>
        <div style={{textAlign: 'left'}} className="card-body">

        <Link 
        className="notificationCard"  to={`/plant/${plantID}`}>
                    {message.icon&&<img src={message.icon} id="icon" style={{width:'20px',height:'20px',alignItems: "center",opacity:'0.7'}} />}&nbsp;
            <h2 style={{fontSize:'11px',color:'black',  textTransform: 'capitalize'}}>{message.text} </h2> 
            <h2 style={{fontSize:'8px',color:'black'}}>  {"   "+time+" min ago"}</h2>
        </Link>
        <br/>
        </div>
      </div>
        </div>
    );

}
//setting the right message according to data
const getMessage= (setMessage,status,type,plantID,gardenName,plantSpecies)=>{

    var message="";
    var icon='';

    if (type=='soilMoisture'){
        if(status=='-2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden needs watering"
             icon=moist2Minus
            }
        if(status=='-3')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden needs watering as soon as possible"
            icon=moist3Minus
        }
        if(status=='2')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden is overwatered, Do not water for the next 24 hours"
            icon=moist2
        }
        if(status=='3')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is extremely overwatered, Do not water for the next few days"
             icon=moist3
            }
      
    }
    if (type=='temperature'){
        if(status=='-2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is a little cold, Consider changing its location"
            icon=tempC2
        }
        if(status=='-3')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden is very cold, We recommend changing its location"
             icon=tempC3
         }
        if(status=='2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is a little hot, Consider changing its location"
            icon=tempH2    
        }
        if(status=='3')
        { 
               message = "Your "+plantSpecies+ " in "+ gardenName+" garden is very hot, We recommend changing its location"
                icon=tempH3    
        }
    }
    if (type=='light'){
        if(status=='-2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden does not get enought light, Consider changing its location"
             icon=light2Minus
            }
        if(status=='-3')
        { 
            message = "Your " +plantSpecies+ " in "+ gardenName+" garden does not get enought light, We recommend changing its location"
            icon=light3Minus
        }
        if(status=='2')
        {
             message = "Your " +plantSpecies+ " in "+ gardenName+" garden get too much light, Consider changing its location"
             icon=light2
            }
        if(status=='3')
        { 
            message = "Your " +plantSpecies+ " in "+ gardenName+" garden is has over exposure to light, We recommend changing its location"
            icon=light3
        }
    }
    setMessage({text:message,icon:icon});
}
//setting the time that has passed since the notification was sent

const getTime=(setTime,date)=>{
    const d = new Date(date);
    const now = new Date();

    var diff = (now-d);
    var diffDays = Math.floor(diff / 86400000); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.floor((diff/1000)/60)%60 ;
    var timestamp = diffMins;
    if (diffHrs){
        if (diffHrs==1) timestamp = diffHrs + " hour, " + timestamp;
        else (timestamp = diffHrs + " hours, " + timestamp);
    }
    if (diffDays){
        if (diffDays==1) timestamp = diffDays + " day, " + timestamp;
        else (timestamp = diffDays + " days, " + timestamp);
    }
    setTime(timestamp);
  }