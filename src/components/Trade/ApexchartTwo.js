
import React, {useEffect, useRef, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

const ApexChartTwo = () => {
    const [chartType, setChartType] = useState('candlestick');
    const [lockTime, setLockTime] = useState(new Date(1538829000000).getTime());
    const [expireTime, setExpireTime] = useState(new Date(1538834400000).getTime());
    const [buyTime, setBuyTime] = useState(new Date(1538809200000).getTime());
    const [sellTime, setSellTime] = useState(new Date(1538816400000).getTime());
    const [chartReady, setChartReady] = useState(false);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);

    const generateRandomDataPoint = () => {
        const newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() + 1);

        const newDataPoint = {
            x: newDate.getTime(),
            y: [
                Math.random() * (7000 - 6500) + 6500,
                Math.random() * (7000 - 6500) + 6500,
                Math.random() * (7000 - 6500) + 6500,
                Math.random() * (7000 - 6500) + 6500,
            ],
        };

        setChartData((prevData) => [...prevData, newDataPoint]);
    };

    useEffect(() => {
        const interval = setInterval(generateRandomDataPoint, 1000);

        return () => clearInterval(interval);
    }, []);

    const lineData = chartData.map((item) => ({
        x: item.x,
        y: item.y && item.y.length >= 4 ? item.y[3] : 0,
    }));

    const options = {
        chart: {
            height: 350,
            type: chartType,
            zoom: {
                enabled: true,
                type: 'selection',
            },
        },
        theme: {
            mode: 'dark',
        },
        title: {
            text: `${chartType === 'candlestick' ? 'CandleStick' : 'Line'} Chart - Category X-axis`,
            align: 'left',
            style: {
                color: 'rgba(255, 255, 255, 0.87)',
            },
        },
        annotations: {
            xaxis: [
                {
                    x: lockTime,
                    borderColor: '#FF4560',
                    label: {
                        borderColor: '#FF4560',
                        style: {
                            fontSize: '12px',
                            color: 'rgba(0,0,0,0.57)',
                            background: '#FF4560',
                            position: 'absolute',
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'left top',
                            whiteSpace: 'nowrap',
                        },
                        offsetY: -5,
                        text: 'Lock Time',
                    },
                    type: 'line',
                },
                {
                    x: expireTime,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            fontSize: '12px',
                            color: '#333333',
                            background: '#00E396',
                            position: 'absolute',
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'left top',
                            whiteSpace: 'nowrap',
                        },
                        offsetY: -5,
                        text: 'Expire Time',
                    },
                    type: 'line',
                },
            ],
            points: [
                {
                    x: buyTime,
                    y: chartData.find((data) => data.x.getTime() === buyTime).y[3],
                    marker: {
                        size: 6,
                        fillColor: '#4CAF50',
                        strokeWidth: 0,
                    },
                    label: {
                        borderColor: '#4CAF50',
                        style: {
                            fontSize: '12px',
                            color: '#333333',
                            background: '#4CAF50',
                        },
                        offsetY: 0,
                        text: 'Buy',
                    },
                    type: 'scatter',
                },
                {
                    x: sellTime,
                    y: chartData.find((data) => data.x.getTime() === sellTime).y[3],
                    marker: {
                        size: 6,
                        fillColor: '#FF9800',
                        strokeWidth: 0,
                    },
                    label: {
                        borderColor: '#FF9800',
                        style: {
                            fontSize: '12px',
                            color: '#333333',
                            background: '#FF9800',
                        },
                        offsetY: 0,
                        text: 'Sell',
                    },
                    type: 'scatter',
                },
            ],
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: (val) => dayjs(val).format('MMM DD HH:mm'),
                style: {
                    colors: 'rgba(255, 255, 255, 0.87)',
                },
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    colors: 'rgba(255, 255, 255, 0.87)',
                },
            },
        },
    };

    const handleWheel = (event) => {
        event.preventDefault();

        if (chartReady) {
            const chart = document.querySelector('#chart');

            if (chart) {
                const chartRect = chart.getBoundingClientRect();
                const mouseX = (event.clientX - chartRect.left) / chartRect.width;

                const currentMinX = chart.w.globals.minX;
                const currentMaxX = chart.w.globals.maxX;
                const totalX = currentMaxX - currentMinX;

                const zoomFactorIn = 0.1;
                const zoomFactorOut = 0.9;
                const zoomRange = event.deltaY < 0 ? zoomFactorIn * totalX : zoomFactorOut * totalX;

                const midPoint = currentMinX + mouseX * totalX;
                const newMinX = midPoint - zoomRange / 2;
                const newMaxX = midPoint + zoomRange / 2;

                const constrainedMinX = Math.max(newMinX, chart.w.globals.initialMinX);
                const constrainedMaxX = Math.min(newMaxX, chart.w.globals.initialMaxX);

                if (!isNaN(constrainedMinX) && !isNaN(constrainedMaxX) && constrainedMinX < constrainedMaxX) {
                    chart.updateOptions({
                        xaxis: {
                            min: constrainedMinX,
                            max: constrainedMaxX,
                        },
                    });
                }
            }
        }
    };

    const handleZoomIn = () => {
        const chart = chartRef.current.chart;

        if (chart) {
            const { minX, maxX } = chart.w.globals;
            const zoomFactorIn = 0.1;
            const zoomedRange = (maxX - minX) * zoomFactorIn;
            const newMinX = minX + zoomedRange;
            const newMaxX = maxX - zoomedRange;

            chart.updateOptions({
                xaxis: {
                    min: newMinX,
                    max: newMaxX,
                },
            });
        }
    };
    const handleZoomOut = () => {
        const chart = chartRef.current.chart;

        if (chart) {
            const { minX, maxX } = chart.w.globals;
            const zoomFactorOut = 0.9;
            const zoomedRange = (maxX - minX) * zoomFactorOut;
            const newMinX = minX - zoomedRange;
            const newMaxX = maxX + zoomedRange;

            chart.updateOptions({
                xaxis: {
                    min: newMinX,
                    max: newMaxX,
                },
            });
        }
    };

    useEffect(() => {
        const chart = document.querySelector('#chart');

        if (chart) {
            const handleChartReady = () => {
                setChartReady(true);
            };

            chart.addEventListener('chartReady', handleChartReady);

            return () => {
                chart.removeEventListener('chartReady', handleChartReady);
            };
        }
    }, []);

    const handleZoomChange = (zoom) => {
        const chart = chartRef.current.chart;

        if (chart) {
            const { minX, maxX } = chart.w.globals;
            const newMinX = minX + (maxX - minX) * zoom;
            const newMaxX = maxX - (maxX - minX) * zoom;

            chart.updateOptions({
                xaxis: {
                    min: newMinX,
                    max: newMaxX,
                },
            });
        }
    };


    return (
        <div>
            <div id="chart" onWheel={handleWheel}>
                <ReactApexChart options={options} series={[{ data: chartType === 'candlestick' ? chartData : lineData }]} type={chartType} height={350} />
            </div>
            <button
                onClick={() => {
                    setChartType((prevType) => (prevType === 'candlestick' ? 'line' : 'candlestick'));
                    setLockTime(null);
                    setExpireTime(null);
                }}
            >
                Переключить тип графика
            </button>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
    );
}

export default ApexChartTwo;