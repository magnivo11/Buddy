export default function Profile(){
    return (
      <div>
          
       <section id="hero" className="d-flex align-items-center">
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
        <div className="container" data-aos="fade-up"  >
                  <div className="section-title" >
                <h2 style={{fontSize:'35px'}}>My Profile</h2>
                   </div>
                  <meta charSet="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css" />
                  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                  <style dangerouslySetInnerHTML={{__html: "\nhtml, body, h1, h2, h3, h4, h5 {font-family: \"Poppins\", sans-serif}\n" }} />
                   
                   
                   {/* Page Container */}
                 <div className="w3-container w3-content" style={{maxWidth: '1400px', marginTop: '80px'}}>    
                   {/* The Grid */}
                    <div className="w3-row">
                      {/* Left Column */}
                      <div className="w3-col m3">

                        <div class="w3-card w3-round w3-white">
                            <div class="w3-container">
                              <h4 className="w3-center">Jon Dou</h4>
                              <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{height: '106px', width: '106px'}} alt="Avatar" /></p>
                              <hr />
                              <p><i className="fa fa-envelope fa-fw w3-margin-right w3-text-theme" /> Jon@gmail.com</p>
                              <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> London, UK</p>
                              <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> April 1, 1988</p>
                            </div>
                        </div>
              
                      </div>

                      {/*middle */}
                      <div className="w3-col m7">
                        <div className="w3-row-padding">
                          <div className="w3-col m12">
                            <div className="w3-card w3-round w3-white">
                              <div className="w3-container w3-padding">
                                  {/* Accordion */}
                                      <div className="w3-card w3-round">
                                        <div className="w3-white">
                                          <button onclick="myFunction('Demo1')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> My Groups</button>
                                          <button onclick="myFunction('Demo2')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right" /> My Events</button>
                                          <button onclick="myFunction('Demo3')" className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-users fa-fw w3-margin-right" /> My Photos</button>
                                        
                                          </div>
                                        </div>      
                                      </div>
                                     <br />
                                    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                                      <span onclick="this.parentElement.style.display='none'" className="w3-button w3-theme-l3 w3-display-topright">
                                        <i className="fa fa-remove" />
                                      </span>
                                      <p><strong>Hey!</strong></p>
                                      <p>People are looking at your profile. Find out who.</p>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>    
                        </div>
                      </div>
                    
                    
                  </div>
                  </section>
       </section>
       </div>
     );
   }