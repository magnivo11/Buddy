import {Link} from 'react-router-dom'


export default function ButtonComponent({id,name}){
   

    return(
        <div>
              <section id="specials" className="specials">
        <div className="container" data-aos="fade-up">
        
        <ul className="nav nav-tabs flex-column">
            <li  className="nav-menu d-none d-lg-block">
                <Link className="nav-link"  to={`/singlegarden/${id}`}>{name} </Link>
            </li>
            </ul>
            </div>
            </section>
        </div>
    );


}