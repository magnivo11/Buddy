import '../css/PhotoSlide.css';
import React from 'react';

export default function PhotoBox({ slideImg }) {

  return (
    <div className="each-slide">
      <div style={{ height: '400px' ,'backgroundImage': `url(http://localhost:8080/photo/find/${slideImg})` }}>
       </div>
    </div>
  )
}