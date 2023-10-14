import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function NodeGraph() {
    const svgRef = useRef(null);

    useEffect(() => {
        const chartContainer = document.getElementById('chart-container');
        const width = chartContainer.clientWidth;
        const height = chartContainer.clientHeight;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr("style", "outline: thin solid gray;")
            .style("border-radius", "20px");

        const nodes = [
            { ind: 0, id: '0x000001', x: width / 2, y: height / 2 },
            { ind: 1, id: '0x000002', x: 200, y: 100 },
            { ind: 2, id: '0x000003', x: 400, y: 40 },
            { ind: 3, id: '0x000004', x: 600, y: 100 },
            { ind: 4, id: '0x000005', x: 200, y: 200 },
            { ind: 5, id: '0x000006', x: 400, y: 270 },
            { ind: 6, id: '0x000007', x: 600, y: 200 },
        ];

        const links = [
            { source: 0, target: 0 },
            { source: 1, target: 0 },
            { source: 2, target: 0 },
            { source: 3, target: 0 },
            { source: 4, target: 0 },
            { source: 5, target: 0 },
            { source: 6, target: 0 },
        ];

        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-200))
            .force('link', d3.forceLink(links).distance(100))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on('tick', () => {
                nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
                lines
                    .attr('x1', (d) => d.source.x)
                    .attr('y1', (d) => d.source.y)
                    .attr('x2', (d) => d.target.x)
                    .attr('y2', (d) => d.target.y);
            });

        const lines = svg.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        const nodeGroup = svg.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .call(
                d3.drag()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        nodeGroup
            .append('circle')
            .attr('r', 10)
            .attr('fill', (d, i) => `rgb(${30 + (i * 225 / nodes.length)}, 0, 255)`);

        nodeGroup
            .append('text')
            .attr('x', 12)
            .attr('dy', '0.35em')
            .text((d, i) => (i !== 0 ? d.id : ''))
            .style('fill', 'white');
    }, []);

    return (
        <div id="chart-container" style={{ width: '100%', height: '300px' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}
