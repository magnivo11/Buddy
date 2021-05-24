import {Link} from 'react-router-dom'
import React from 'react';

export default function Notification({date,status,type,plantID,gardenName,plantSpecies}){
   
    const [message,setMessage]=React.useState([]);
    const [time,setTime]=React.useState([]);
    React.useEffect(()=> getMessage(setMessage,status,type,plantID,gardenName,plantSpecies),[])
    React.useEffect(()=> getTime(setTime,date),[])

    return(
        <div>

              <div  style={{ fontFamily: "Open Sans" }}>
        <div style={{textAlign: 'left'}} className="notificationContainer">
        <Link 
        className="nav-link"  to={`/plant/${plantID}`}>
                    {message.icon&&<i class={message.icon} style={{color:"black"}}/>}&nbsp;&nbsp;
            <a className="notificationText">{message.text} </a> &nbsp;&nbsp;
            <a style={{fontSize:'10px'}}>  {"   "+time+" min ago"}</a>
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
            }
        if(status=='-3')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden needs watering as soon as possible"
        }
        if(status=='2')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden is overwatered, Do not water for the next 24 hours"
        }
        if(status=='3')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is extremely overwatered, Do not water for the next few days"
            }
      icon="fa fa-tint"
    }
    if (type=='temperature'){
        if(status=='-2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is a little cold, Consider changing its location"
        }
        if(status=='-3')
        { 
            message = "Your "+plantSpecies+ " in "+ gardenName+" garden is very cold, We recommend changing its location"
         }
        if(status=='2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden is a little hot, Consider changing its location"
        }
        if(status=='3')
        { 
               message = "Your "+plantSpecies+ " in "+ gardenName+" garden is very hot, We recommend changing its location"
        }
        icon="fa fa-thermometer-three-quarters"
    }
    if (type=='light'){
        if(status=='-2')
        {
             message = "Your "+plantSpecies+ " in "+ gardenName+" garden does not get enought light, Consider changing its location"
            }
        if(status=='-3')
        { 
            message = "Your " +plantSpecies+ " in "+ gardenName+" garden does not get enought light, We recommend changing its location"
        }
        if(status=='2')
        {
             message = "Your " +plantSpecies+ " in "+ gardenName+" garden get too much light, Consider changing its location"
            }
        if(status=='3')
        { 
            message = "Your " +plantSpecies+ " in "+ gardenName+" garden is has over exposure to light, We recommend changing its location"
        }
        icon="fa fa-sun-o"

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