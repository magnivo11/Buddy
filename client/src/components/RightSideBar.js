import '../css/RightSideBar.css'
 

export default function RightSideBar(){
    return (
<div class="content">
  <div id="sidebar">
  <div className="nav-menu d-none d-lg-block" style={{width: '50%'}}>
      
      <a href="#" style={{marginTop: '0%'}}  className="w3-bar-item w3-button" >All Gardens</a>
      <a href="#" style={{marginTop: '10%'}} className="w3-bar-item w3-button">Bedroom</a>
      <a href="#" style={{marginTop: '10%'}} className="w3-bar-item w3-button">Living Room</a>
      <a href="#" style={{marginTop: '10%'}} className="w3-bar-item w3-button">Balcony</a>

    </div>
  </div>
</div>
    );
  }
