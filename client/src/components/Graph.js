import * as d3 from "d3"

export default function DrawGraph(data,containerID,color) {
    const width = 600;
    const height = 225;
    const margin = { top: 25, bottom: 25, left: 25, right: 25 };

    if(data.length>0){
    
    const svg = d3.select('#'+containerID)
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);
    
    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)
    
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top])
    
    svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(data.sort((a, b) => a.score))
      .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.score))
        .attr('title', (d) => d.score)
        .attr("class", "rect")
        .attr("height", d => y(0) - y(d.score))
        .attr("width", x.bandwidth());
    
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '10px')
    }
    
    function xAxis(g) {
      g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i =>(data[i].name.substring(5,10)+" "+data[i].name.substring(11,16))))
        .attr("font-size", '10px')
    }
    
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();
  }

   }