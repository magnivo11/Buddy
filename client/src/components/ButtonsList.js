import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ButtonComponent from './ButtonComponent'


export default function ButtonsList({ ownerID }) {
    const [items, setItems] = React.useState([])
    axios.get('http://localhost:8080/garden/' + ownerID).then(Response => {
        if (items.length != Response.data.length)
            setItems(Response.data)

    })
    if (items.length < 1)
        return (
            <div>
                <ul className="nav nav-tabs flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to='/addagarden'>Add A Garden! </Link>
                    </li>
                </ul>
            </div>
        );

    return (
        <section id="specials" className="specials">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Specials</h2>
            <p>Check Our Specials</p>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                  <a className="nav-link active show" data-toggle="tab" href="#tab-1">Modi sit est</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tab-2">Unde praesentium sed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tab-3">Pariatur explicabo vel</a>
                </li>
             
              </ul>
            </div>
            
          </div>
        </div>
      </section>
//         <div>
//               <section id="specials" class="specials">
//       <div class="container" data-aos="fade-up">

//             <div class="row" data-aos="fade-up" data-aos-delay="100">
//                 <div class="col-lg-3"></div>
//                 <ul className="nav nav-tabs flex-column">
//                     <li className="nav-menu d-none d-lg-block">
//                         <Link style={{ width: '260px' }} className="nav-link" to='/mygardens'>All Gardens </Link>
//                     </li>
//                     {items.map((data, key) => {
//                         return <ButtonComponent id={data._id} name={data.name} key={key} />
//                     })}
//                     <li className="nav-menu d-none d-lg-block">
//                         <Link className="nav-link" to='/addagarden'>Add A Garden! </Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//         </section>
// </div>            
    );


}