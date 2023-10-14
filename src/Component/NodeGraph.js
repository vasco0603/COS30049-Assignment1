import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function NodeGraph({ transactionFlow }) {
    const svgRef = useRef(null);
    const simulationRef = useRef(null);

    useEffect(() => {
        let data;
        if (transactionFlow === 'in') {
            // Load data for transaction flow in
            data = [
                // ... define your data for 'in' flow here
            ];
        } else if (transactionFlow === 'out') {
            // Load data for transaction flow out
            data = [
                // ... define your data for 'out' flow here
            ];
        }

        // Get the SVG container and dimensions
        const chartContainer = document.getElementById('chart-container');
        const width = chartContainer.clientWidth;
        const height = chartContainer.clientHeight;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr("style", "outline: thin solid gray;")
            .style("border-radius", "20px");

        const nodes = [
            { ind: 0, id: '0x000001'},
            { ind: 1, id: '0x000002'},
            { ind: 2, id: '0x000003'},
            { ind: 3, id: '0x000004'},
            { ind: 4, id: '0x000005'},
            { ind: 5, id: '0x000006'},
            { ind: 6, id: '0x000007'},
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

        // Initialize or update the simulation
        if (!simulationRef.current) {
            // Create the simulation if it doesn't exist
            simulationRef.current = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(-200))
                .force('link', d3.forceLink(links).distance(100))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .on('tick', () => {
                    // Update node and line positions
                    nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
                    lines
                        .attr('x1', (d) => d.source.x)
                        .attr('y1', (d) => d.source.y)
                        .attr('x2', (d) => d.target.x)
                        .attr('y2', (d) => d.target.y);
                });
        } else {
            // Restart the simulation if it already exists
            simulationRef.current.nodes(nodes).force('link').links(links);
            simulationRef.current.alpha(1).restart();
        }

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
                        if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulationRef.current.alphaTarget(0);
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
    }, [transactionFlow]);

    return (
        <div id="chart-container" style={{ width: '100%', height: '300px' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}
