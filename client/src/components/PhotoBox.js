import '../css/PhotoSlide.css';
import React from 'react';

export default function PhotoBox({ slideImg }) {
 var res =  slideImg.replace(/\s/g, '%20') 
  var url = process.env.REACT_APP_SERVER_URL+"/photo/find/"+res;
  return (
    <div className="each-slide">
      <div style={{ width:'300px', height:'400px' ,'backgroundImage': `url(${url})`}}>
       </div>
    </div>
  )
}

