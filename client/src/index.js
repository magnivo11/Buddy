import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import Header from './components/Header';
import Hero from './components/hero';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import MainBar from './components/MainBar';




ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <App/>
    <RightSideBar/>
    <LeftSideBar/>
    <Hero/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
