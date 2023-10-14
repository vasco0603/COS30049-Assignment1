import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NodeGraph = ({ transactions, transactionFlow }) => {
    const svgRef = useRef(null);
    const simulationRef = useRef(null);

    useEffect(() => {
        const chartContainer = document.getElementById('chart-container');
        const width = chartContainer.clientWidth;
        const height = chartContainer.clientHeight;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('style', 'outline: thin solid gray;')
            .style('border-radius', '20px');

        const nodes = [];
        const links = [];

        transactions.forEach((transactionGroup) => {
            transactionGroup.forEach((transaction) => {
                const fromNode = transaction._nodes[0];
                const toNode = transaction._nodes[1];

                let fromNodeIndex = nodes.findIndex((node) => node.id === fromNode.addressId);
                if (fromNodeIndex === -1) {
                    fromNodeIndex = nodes.length;
                    nodes.push({
                        id: fromNode.addressId,
                        name: fromNode.name,
                        type: fromNode.type,
                    });
                }

                let toNodeIndex = nodes.findIndex((node) => node.id === toNode.addressId);
                if (toNodeIndex === -1) {
                    toNodeIndex = nodes.length;
                    nodes.push({
                        id: toNode.addressId,
                        name: toNode.name,
                        type: toNode.type,
                    });
                }

                links.push({
                    source: fromNodeIndex,
                    target: toNodeIndex,
                });
            });
        });

        const drag = d3.drag()
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
            });

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
            .call(drag);

        nodeGroup
            .append('circle')
            .attr('r', 10)
            .attr('fill', (d, i) => `rgb(${30 + (i * 225 / nodes.length)}, 0, 255)`);

        nodeGroup
            .append('text')
            .attr('x', 12)
            .attr('dy', '0.35em')
            .text((d, i) => (i !== -1 ? d.name : ''))
            .style('fill', 'white');
    }, [transactions, transactionFlow]);

    return (
        <div id="chart-container" style={{ width: '100%', height: '300px' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default NodeGraph;
