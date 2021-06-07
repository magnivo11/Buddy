import {Link, Redirect} from 'react-router-dom';

export default function FirstPage(){
  const userIDfromSession = window.sessionStorage.getItem('userID');

  if (!userIDfromSession){
    return (
      <div>
    <section id="hero" className="d-flex align-items-center" >           
         <div className="container backFirstPage position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
           <div className="row" style={{position: "center"}}>
             <div className="col-lg-8">
               <h1>Welcome to <span> Buddy</span></h1>
               <h2>Make your plants talk.</h2>
               <div className="btns">
                 <Link to="/login" className="btn-menu animated fadeInUp scrollto">Log in</Link>
                 <Link to="/register" className="btn-book animated fadeInUp scrollto">Register</Link>
               </div>
             </div>
           
           </div>
         </div>
     </section>
    </div>
     );
  }
  else{
    return (<Redirect to="/mygardens" />);
  }
}