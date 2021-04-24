import React from 'react'
import NotificationsList from './NotificationsList'

export default function Notifications(){

  const userID = window.sessionStorage.getItem('userID');
  const [notifications,setNotifications]=React.useState([])
  const [hasNotifications,setHasNotifications]=React.useState(false)

  React.useEffect(() => {
      fetch('http://localhost:8080/user/allnotifications/'+userID)
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
        <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
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


 