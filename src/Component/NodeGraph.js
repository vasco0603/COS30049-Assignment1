import React, { Component } from 'react';
import * as d3 from 'd3';

class NodeGraph extends Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        const width = 800;
        const height = 300;
        const boxHeight = 300;

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#transparent")
            .attr("style", "outline: thin solid gray;")
            .style("border-radius", "20px");

        const nodes = [
            { ind: 0, id: "0x000001", x: width/2, y: height/2 },
            { ind: 1, id: "0x000002", x: 200, y: 100 },
            { ind: 2, id: "0x000003", x: 400, y: 40 },
            { ind: 3, id: "0x000004", x: 600, y: 100 },
            { ind: 4, id: "0x000005", x: 200, y: 200 },
            { ind: 4, id: "0x000006", x: 400, y: 270 },
            { ind: 5, id: "0x000007", x: 600, y: 200 }
        ];

        const links = [
            { source: 0, target: 0 },
            { source: 1, target: 0 },
            { source: 2, target: 0 },
            { source: 3, target: 0 },
            { source: 4, target: 0 },
            { source: 5, target: 0 },
            { source: 6, target: 0 }
        ]

        svg.selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return nodes[d.source].x; // Access the source node's x-coordinate
            })
            .attr("y1", function (d) {
                return nodes[d.source].y; // Access the source node's y-coordinate
            })
            .attr("x2", function (d) {
                return nodes[d.target].x; // Access the target node's x-coordinate
            })
            .attr("y2", function (d) {
                return nodes[d.target].y; // Access the target node's y-coordinate
            })
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("cx", function(d){
                return d.x
            })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", 10)
            .attr("fill", function(d,i){
                return "rgb("+(30+(i*225/nodes.length))+",0,255)";
            });

        svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("x", function(d){
                return d.x + 20;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .text(function(d,i){
                if (i !== 0)
                {
                    return d.id;
                }
            })
            .style("fill", "white");

    }
    render() {
        return (<div id={"#" + this.props.id}></div>)

    }
}
export default NodeGraph;
