export default function LeftSideBar(){
      return (
        <div>
          <title>W3.CSS</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
          {/* Sidebar */}
          <div className="nav-menu d-none d-lg-block" style={{width: '20%'}}>
      
            <a href="#" style={{marginTop: '50%'}} className="w3-bar-item w3-button" >My Gardens</a>
            <a href="#" style={{marginTop: '5%'}} className="w3-bar-item w3-button">News Feed</a>
            <a href="#" style={{marginTop: '5%'}} className="w3-bar-item w3-button">My Profile</a>
            <a href="#" style={{marginTop: '5%'}} className="w3-bar-item w3-button">The Plant Bible</a>
            <a href="#" style={{marginTop: '5%'}} className="w3-bar-item w3-button">About Us</a>

          </div>
         
        </div>
      );
    }
