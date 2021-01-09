export default function Page(){
    return (
      <div>
          
       <section id="hero" className="d-flex align-items-center">
         <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
         <div className="col-lg-3">  {/*left buttons*/}
             <ul className="nav nav-tabs flex-column">
               <li className="nav-item">
                 <a className="nav-link active show" data-toggle="tab" href="#tab-1">My Gardens</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" data-toggle="tab" href="#tab-2">News Feed</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" data-toggle="tab" href="#tab-3">My Profile</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" data-toggle="tab" href="#tab-4">About Us</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" data-toggle="tab" href="#tab-5">The Plant Bible</a>
               </li>
             </ul>
           </div>
           
             <div className="col-lg-8">
               <h1>Insert text here</h1>
              
           
           </div>
         </div>
         
       </section>
       </div>
     );
   }