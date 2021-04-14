import React from 'react';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart(){

    const options = {
        backgroundColor: "#F5DEB3",
        animationEnabled: true,	
        title:{
            text:'Soil Moisture'
        },
        axisY : {
            title: ""
        },
        toolTip: {
            shared: true
        },
        data: [
        {
            type: "spline",
            name: "sensor",
            showInLegend: true,
            dataPoints: [
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 175, label: "Mar" },
                { y: 172, label: "Apr" },
                { y: 162, label: "May" },
                { y: 165, label: "Jun" },
                { y: 172, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" }
            ]
        },
        {
            type: "spline",
            name: "optimal",
            color:'green',
            showInLegend: true,
            dataPoints: [
                { y: 170, label: "Jan" },
                { y: 170, label: "Feb" },
                { y: 170, label: "Mar" },
                { y: 170, label: "Apr" },
                { y: 170, label: "May" },
                { y: 170, label: "Jun" },
                { y: 170, label: "Jul" },
                { y: 170, label: "Aug" },
                { y: 170, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 170, label: "Nov" },
                { y: 170, label: "Dec" }
            ]
        }
    ],
        
}

    return(
        <CanvasJSChart options = {options}
        /* onRef = {ref => this.chart = ref} */
    />
    );

}