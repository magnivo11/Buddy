import { TableRow } from '@material-ui/core';
import {Link} from 'react-router-dom'


export default function MyGardens(){
 return (
   <div>
    <section id="hero" className="d-flex align-items-center" >
    <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.8)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
        <div className="container" data-aos="fade-up"  >
            <div className="section-title" >
            <h2 style={{fontSize:'40px'}}>My Gardnes</h2>
            <p style={{fontSize:'30px'}}>All Gardens</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                    <a className="nav-link active show" >All Gardens</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/singlegarden">Balcony</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"  href="/singlegarden">Living Room</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/singlegarden">Bedroom</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/addagarden'>Add A Garden </Link>
                </li>
                </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                    <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Architecto ut aperiam autem id</h3>
                        <p className="font-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                        <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                    </div>
                
                    </div>
                </div>
               
                    
                
                </div>
            </div>
            </div>
        </div>
    </section>{/* End Specials Section */}
    </section>
    </div>
  );
}