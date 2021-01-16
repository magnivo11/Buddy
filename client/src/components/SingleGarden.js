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
import passionShrub from '../Images/PassionShrub.png'; 





export default function SingleGarden(){
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
         <br></br>
         <br></br>
         <br></br>

          <h4 style={{color:'white'}}>Choose a plant to see it's growth!</h4>
         
        </div>
        
        <div className="row" style={{position: "center"}}>
          <div className="col-lg-8">
            <h1>Single Garden </h1>
            <br></br>
          
    
            <div>
              <meta charSet="utf-8" />
              <style dangerouslySetInnerHTML={{__html: "\n a { padding: 1px; ; display: inline-block; }\n "}} />
            <TableRow>
            <a style={{backgroundColor: 'white'}} href="#" >
                <img src={roses} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={roses} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={roses} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={roses} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={roses} width={50}   />
              </a> 
            
            
              </TableRow>
              <TableRow>
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={corn} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={corn} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={corn} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={corn} width={50}   />
              </a> 
              <a style={{backgroundColor: 'white'}} href="#" >
                <img src={corn} width={50}   />
              </a> 
             
              </TableRow>
            
          
            </div>
            <h2>Information</h2>
            <div>
              <meta charSet="utf-8" />
              <style dangerouslySetInnerHTML={{__html: "\n a { padding: 1px; ; display: inline-block; }\n "}} />
              <TableRow>

              <a style={{backgroundColor: 'white'}}>
                Species <img src={space} width={30}/><img src={space} width={10}/>
              </a> 
              <a style={{backgroundColor: 'white'}}>
                Status <img src={space} width={30}/>
              </a>  <a style={{backgroundColor: 'white'}} >
                Cause <img src={space} width={30}/>
              </a> 
              </TableRow>
           
            <TableRow>
              <a style={{backgroundColor: 'white'}} href="/plant" >
              <img src={roses} width={30}/>
                Roses 
                <img src={space} width={30}/>
                <img src={statusYellow} width={30}/>
                </a>
                <a style={{backgroundColor: 'white'}}>
                <img src={space} width={30}/>
                Low Humidity
                <img src={space} width={5}/>

              </a>  
              </TableRow>
              <TableRow>
              <a style={{backgroundColor: 'white'}} href="/plant" >
              <img src={corn} width={30}/>
                Corn 
                <img src={space} width={30}/><img src={space} width={8}/>
                <img src={statusGreen} width={30}/>
                <img src={space} width={30}/><img src={space} width={30}/><img src={space} width={33}/><img src={space} width={35}/>

              </a>  
              </TableRow>
             

              <TableRow>
              <a style={{backgroundColor: 'white'}} href="/addaplant" >
                <img src={space} width={30}/><img src={space} width={30}/><img src={space} width={30}/>
                Add A Plant
                <img src={space} width={30}/><img src={space} width={30}/><img src={space} width={30}/>

              </a> 
              </TableRow>
            </div>
            <li className="nav-item">
              <a href="/singlegarden" className="nav-link"  >Delete Garden</a>
            </li>
            </div>
            <section>
      <div>
            <h2>Tip From Us!</h2>
            <h5 style={{color:'white'}}>The system recommends you to plant: </h5>
            <h4 style={{color:'white'}}>Passion Shrub! </h4>
            <img src={passionShrub} width={60}/>
            </div>
    </section>
           
       </div>
    
      </div>
   
    </section>

    </div>
  );
}