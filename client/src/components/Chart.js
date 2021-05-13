import React from 'react';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({title,sensorData,optimalValue}){

    const displyTime=(date)=>{
        var currentHours = date.getHours()
        currentHours = ("0" + currentHours).slice(-2)
        var currentMinutes=date.getMinutes()
        if(currentMinutes<10)
        currentMinutes='0'+currentMinutes
        var displyTime=currentHours+':'+currentMinutes
        var month = date.getUTCMonth() + 1
        var day = date.getUTCDate()
        var year = date.getUTCFullYear()
        var newdate = day + "/" + month + "/" + year;
        displyTime=displyTime+' '+newdate
        return displyTime
    }
    
    if(sensorData){
        var data;
        if(sensorData.length>10){
            data=sensorData.slice(sensorData.length-1-10,sensorData.length)
        }
        else{ 
        data=sensorData
        }
        var fromSensor = []
        var optimal=[]
  data.map((data, key) => {
      
   
     fromSensor.push({ y : data.value, label :displyTime(new Date(data.date)) })
     optimal.push({ y : optimalValue, label :displyTime(new Date(data.date)) })
     


 })


    }

    const options = {
        "@media (max-width: 700px)": {
            width:300,        height:200        },
        width:500,
        height:400,
        backgroundColor: "#F5DEB3",
        animationEnabled: true,	
        title:{
            text:title
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
            dataPoints: fromSensor
            //  [
            //     { y: 172, label: "Jan" },
            //     { y: 173, label: "Feb" },
            //     { y: 175, label: "Mar" },
            //     { y: 172, label: "Apr" },
            //     { y: 162, label: "May" },
            //     { y: 165, label: "Jun" },
            //     { y: 172, label: "Jul" },
            //     { y: 168, label: "Aug" },
            //     { y: 175, label: "Sept" },
            //     { y: 170, label: "Oct" },
            //     { y: 165, label: "Nov" },
            //     { y: 169, label: "Dec" }
            // ]
        },
        {
            type: "spline",
            name: "optimal",
            color:'green',
            showInLegend: true,
            dataPoints:optimal
            //  [
            //     { y: 170, label: "Jan" },
            //     { y: 170, label: "Feb" },
            //     { y: 170, label: "Mar" },
            //     { y: 170, label: "Apr" },
            //     { y: 170, label: "May" },
            //     { y: 170, label: "Jun" },
            //     { y: 170, label: "Jul" },
            //     { y: 170, label: "Aug" },
            //     { y: 170, label: "Sept" },
            //     { y: 170, label: "Oct" },
            //     { y: 170, label: "Nov" },
            //     { y: 170, label: "Dec" }
            // ]
        }
    ],
 
}



    return(
        <CanvasJSChart options = {options}
        /* onRef = {ref => this.chart = ref} */
    />
    );

}