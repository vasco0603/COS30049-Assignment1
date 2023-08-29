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
            .style("background-color", "red");

        const nodes = [
            { ind: 0, x: width/2, y: height/2 },
            { ind: 1, x: 200, y: 100 },
            { ind: 2, x: 400, y: 40 },
            { ind: 3, x: 600, y: 100 },
            { ind: 4, x: 200, y: 200 },
            { ind: 4, x: 400, y: 270 },
            { ind: 5, x: 600, y: 200 }
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
            .attr("stroke-width", 3);

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
            .attr("r", 15)
            .attr("fill", "green");

    }
    render() {
        return (<div id={"#" + this.props.id}></div>)

    }
}
export default NodeGraph;
