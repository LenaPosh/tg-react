import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const NewGraph = () => {
    const [data, setData] = useState([]);
    const svgRef = useRef();

    const generateData = () => {
        const newNumber = Math.floor(Math.random() * 100);
        const newDataPoint = { time: new Date(), value: newNumber };
        setData(currentData => [...currentData, newDataPoint].slice(-50)); // Оставляем последние 50 точек данных
    };

    useEffect(() => {
        const margin = { top: 40, right: 20, bottom: 50, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("overflow", "visible");

        svg.selectAll("*").remove(); // Очищаем предыдущие элементы

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleTime()
            .domain([d3.min(data, d => d.time), d3.max(data, d => d.time)])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(5);
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);
        g.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        const sortedData = data.sort((a, b) => a.time - b.time);

        const myLine = d3.line()
            .x(d => xScale(d.time))
            .y(d => yScale(d.value));

        g.append("path")
            .datum(sortedData)
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue");

        // Функция зума и панорамирования
        const zoom = d3.zoom()
            .scaleExtent([1, 10]) // Расширяем масштабирование
            .translateExtent([[-width * 5, -height * 5], [width * 6, height * 6]]) // Расширяем область панорамирования
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            generateData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <svg ref={svgRef} />
        </React.Fragment>
    );
};

export default NewGraph;






