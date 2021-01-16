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
              <a className="nav-link" data-toggle="tab" href="#tab-2">Bedroom</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tab-3">Living Room</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tab-4">Balcony</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tab-5">Add A Garden</a>
            </li>
          </ul>
        </div>
        
        <div className="row" style={{position: "center"}}>
          <div className="col-lg-8">
            <h1>My Gardens </h1>
            <h2>All Gardens</h2>
            <div className="btns">
              <a href="#menu" className="btn-menu animated fadeInUp scrollto">News Feed</a>
              <a href="#book-a-table" className="btn-book animated fadeInUp scrollto">Plants Bible</a>
            </div>
          </div>
        
        </div>
      </div>
    </section>
    </div>
  );
}