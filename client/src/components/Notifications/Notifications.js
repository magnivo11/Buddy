import React from 'react'
import NotificationsList from './NotificationsList'
import DataContext from '../../DataContext';
import axios from 'axios';

export default function Notifications(){


  const data=React.useContext(DataContext);
  const userID = window.sessionStorage.getItem('userID');
  const [notifications,setNotifications]=React.useState([])
  const [hasNotifications,setHasNotifications]=React.useState(false)
  axios.get(process.env.REACT_APP_SERVER_URL+'/user/setAllNotificationsToSeen/'+userID)
  data.setNewNotifications(0)


  React.useEffect(() => {
      fetch(process.env.REACT_APP_SERVER_URL+'/user/allnotifications/'+userID)
        .then(response => response.json()).then(
          data => {
            setNotifications(data);
            setHasNotifications(true);
            
          }
        )
    },[]);
    
    return (
      <div>    
      <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
        <section id="specials" className="specials notificationsConstDistance" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
          <div className="container" data-aos="fade-up"  >
          <div className="section-title" >
                        <h2 style={{fontSize:'36px'}}>Notifications</h2> <br/><br/>
                        {hasNotifications&& <NotificationsList notifications={notifications}/>}
                      </div>
         </div>
         </section>
       </section>
       </div>
     );
    
  }


 