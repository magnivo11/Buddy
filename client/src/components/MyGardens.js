import { TableRow } from '@material-ui/core';
import cherry from '../Images/Cherries.png'; 
import corn from '../Images/Corn.png'; 
import fennel from '../Images/Fennel.png'; 
import roses from '../Images/roses.png'; 
import tomatos from '../Images/Tomatoes.png'; 
import space from '../Images/white.png'; 
import flower from '../Images/YogaFlower.png'; 
import statusRed from '../Images/statusRed.png';
import statusGreen from '../Images/statusGreen.png';
import statusYellow from '../Images/statusYellow.png';





export default function MyGardens(){
 return (
   <div>
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
      <div className="col-lg-3">  {/*left buttons*/}
          <ul className="nav nav-tabs flex-column">
            <li className="nav-item">
              <a className="nav-link active show" data-toggle="tab" href="#tab-1">All Gardens</a>
            </li>
            <li className="nav-item">
              <a href="/singlegarden" className="nav-link"  >Bedroom</a>
            </li>
            <li className="nav-item">
              <a href="/singlegarden" className="nav-link" >Living Room</a>
            </li>
            <li className="nav-item">
              <a  href="/singlegarden" className="nav-link" >Balcony</a>
            </li>
            <li className="nav-item">
              <a  href="/addagarden" className="nav-link" >Add A Garden</a>
            </li>
          </ul>
        </div>
        
        <div className="row" style={{position: "center"}}>
          <div className="col-lg-8">
            <h1>My Gardens </h1>
       
            <br></br>
          
    
            <div>
              <meta charSet="utf-8" />
              <style dangerouslySetInnerHTML={{__html: "\n a { padding: 1px; ; display: inline-block; }\n "}} />
              <TableRow>

              <a style={{backgroundColor: 'white'}}>
                Garden <img src={space} width={50}/>
              </a> 
              <a style={{backgroundColor: 'white'}}>
                Plants <img src={space} width={50}/>
              </a>  <a style={{backgroundColor: 'white'}} >
                Status <img src={space} width={50}/>
              </a> 
              </TableRow>
           
            <TableRow>
              <a style={{backgroundColor: 'white'}} href="#" >
                BedRoom 
                <img src={space} width={20}/>
                <img src={fennel} width={40}   />
                <img src={flower} width={40} />
                <img src={space} width={40}/> <img src={space} width={20}/>
                <img src={statusRed} width={30}/>
                <img src={space} width={42}/>
              </a>  
              </TableRow>
              <TableRow>
              <a style={{backgroundColor: 'white'}} href="#" >
                Living Room 
                <img src={space} width={20}/>
                <img src={cherry} width={40}   />
                <img src={tomatos} width={40} />
                <img src={space} width={40}/> <img src={space} width={5}/>
                <img src={statusGreen} width={30}/>
                <img src={space} width={40}/>
              </a>  
              </TableRow>
              <TableRow>
              <a style={{backgroundColor: 'white'}} href="#" >
                Balcony 
                <img src={space} width={40}/>
                <img src={roses} width={40}   />
                <img src={corn} width={40} />
                <img src={space} width={40}/><img src={space} width={20}/>
                <img src={statusYellow} width={30}/>
                <img src={space} width={37}/>
              </a>  
              </TableRow>
             

              <TableRow>
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={space} width={40}   />
                <img src={space} width={40}   />
                <img src={space} width={22}   />

                Add A Garden
                <img src={space} width={40}/>
                <img src={space} width={40}   />
                <img src={space} width={22}   />

              </a> 
              </TableRow>
            </div>
          </div>
       </div>
     
      </div>
    </section>
    </div>
  );
}