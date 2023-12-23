import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

const CandlestickChart = () => {
    const [chartType, setChartType] = useState('candlestick');
    const lockTime = new Date().getTime() + 3000;
    const expireTime = new Date().getTime() + 5000;
    const [buyTime, setBuyTime] = useState(new Date(1538809200000).getTime());
    const [sellTime, setSellTime] = useState(new Date(1538816400000).getTime());
    const chartRef = useRef(null);

    const [chartData, setChartData] = useState([]);
    const [redEntry, setRedEntry] = useState(null);
    const [greenEntry, setGreenEntry] = useState(null);


    const lockTimeLine = {
        x: lockTime,
        borderColor: '#FF4560',
        label: {
            borderColor: '#FF4560',
            style: {
                fontSize: '12px',
                color: 'rgba(0,0,0,0.57)',
                background: '#FF4560',
            },
            offsetY: -5,
            text: 'Lock Time',
            position: 'right',
            align: 'right',
        },
        type: 'line',
        strokeDashArray: 0,
        borderWidth: 1,
    };

    const expireTimeLine = {
        x: expireTime,
        borderColor: '#00E396',
        label: {
            borderColor: '#00E396',
            style: {
                fontSize: '12px',
                color: '#333333',
                background: '#00E396',
            },
            offsetY: -5,
            text: 'Expire Time',
            position: 'right',
            align: 'right',
        },
        type: 'line',
        strokeDashArray: 0,
        borderWidth: 1,
    };

    const updateChartData = () => {
        setChartData((prevData) => {
            const newDate = new Date();
            newDate.setSeconds(newDate.getSeconds() + 5);

            const newDataPoint = {
                x: newDate.getTime(),
                y: [
                    (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                    (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                    (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                    (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                ],
            };

            const newData = prevData ? [...prevData, newDataPoint] : [newDataPoint];

            return newData.length >= 50 ? newData.slice(-50) : newData;
        });
    };

    useEffect(() => {
        const interval = setInterval(updateChartData, 1000);

        return () => clearInterval(interval);
    }, []);

    const lineData = chartData.map((item) => ({
        x: item.x,
        y: item.y && item.y.length >= 4 ? item.y[3] : 0,
    }));

    const handleEntryPrice = (color) => {
        if (chartData.length === 0) return;

        const currentData = chartData[chartData.length - 1];
        if (!currentData.y || currentData.y.length < 4) return;

        const entry = { time: currentData.x, price: currentData.y[3] };

        if (color === 'red' && !redEntry) {
            setRedEntry(entry);
        } else if (color === 'green' && !greenEntry) {
            setGreenEntry(entry);
        }
    };

    const redEntryAnnotation = redEntry !== null ? {
        x: redEntry.time,
        y: redEntry.price,
        marker: {
            size: 3,
            fillColor: '#FF0000',
            strokeWidth: 0,
        },
        label: {
            borderColor: '#FF0000',
            style: {
                fontSize: '12px',
                color: '#333333',
                background: '#FF0000',
            },
            offsetY: 0,
            text: 'Вход (Красный)',
        },
        type: 'scatter',
    } : null;

    const greenEntryAnnotation = greenEntry !== null ? {
        x: greenEntry.time,
        y: greenEntry.price,
        marker: {
            size: 3,
            fillColor: '#00FF00',
            strokeWidth: 0,
        },
        label: {
            borderColor: '#00FF00',
            style: {
                fontSize: '12px',
                color: '#333333',
                background: '#00FF00',
            },
            offsetY: 0,
            text: 'Вход (Зеленый)',
        },
        type: 'scatter',
    } : null;


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


    const options = {
        chart: {
            height: 350,
            type: chartType,
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true,
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
                autoSelected: 'pan',
            },
        },
        theme: {
            mode: 'dark',
        },
        title: {
            text: 'Trading Chart',
        },
        annotations: {
            xaxis: [lockTimeLine, expireTimeLine
            ],
            points: [

                {
                    x: buyTime,
                    y: chartData.find((data) => dayjs(data.x).isSame(dayjs(buyTime)))?.y?.[3] || 0,

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
                    y: chartData.find((data) => dayjs(data.x).isSame(dayjs(sellTime)))?.y?.[3] || 0,

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
                redEntryAnnotation,
                greenEntryAnnotation,
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

    if (chartType === 'line') {
        options.stroke = {
            width: 2,
            colors: ['#00F'],
        };
    }

    const handleMoveLeft = () => {
        const chart = chartRef.current.chart;
        if (chart) {
            const { minX, maxX } = chart.w.globals;
            const moveFactor = (maxX - minX) * 0.1;
            chart.updateOptions({
                xaxis: {
                    min: minX - moveFactor,
                    max: maxX - moveFactor,
                },
            });
        }
    };

    const handleMoveRight = () => {
        const chart = chartRef.current.chart;
        if (chart) {
            const { minX, maxX } = chart.w.globals;
            const moveFactor = (maxX - minX) * 0.1;
            chart.updateOptions({
                xaxis: {
                    min: minX + moveFactor,
                    max: maxX + moveFactor,
                },
            });
        }
    };

    const handleMouseWheel = (event) => {
        const chart = chartRef.current.chart;
        if (!chart) return;

        const {minX, maxX} = chart.w.globals;
        const zoomFactor = 0.05; // Determines how much to zoom
        const delta = event.deltaY; // Direction of the wheel scroll

        let newMinX, newMaxX;
        if (delta > 0) { // Zoom out
            newMinX = minX - (maxX - minX) * zoomFactor;
            newMaxX = maxX + (maxX - minX) * zoomFactor;
        } else if (delta < 0) { // Zoom in
            newMinX = minX + (maxX - minX) * zoomFactor;
            newMaxX = maxX - (maxX - minX) * zoomFactor;
        }

        chart.updateOptions({
            xaxis: {
                min: newMinX,
                max: newMaxX,
            },
        }, false, false); // Update options without redrawing chart
    };




    return (
        <div id="chart" onWheel={handleMouseWheel} style={{ marginTop: '40px' }}>
            <ReactApexChart
                options={options}
                series={[
                    {
                        data: chartData.length > 0
                            ? (chartType === 'candlestick' ? chartData : lineData)
                            : []
                    }
                ]}
                type={chartType}
                height={350}
                ref={chartRef}
            />
            <button
                onClick={() => !redEntry && handleEntryPrice('red')}
                style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}
            >
                Fix Red Entry Price
            </button>
            <button
                onClick={() => !greenEntry && handleEntryPrice('green')}
                style={{ backgroundColor: '#00FF00', color: '#FFFFFF' }}
            >
                Fix Green Entry Price
            </button>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button
                onClick={() => {
                    setChartType((prevType) => (prevType === 'candlestick' ? 'line' : 'candlestick'));
                }}
            >
                Переключить тип графика
            </button>
            <button onClick={handleMoveLeft}>Move Left</button>
            <button onClick={handleMoveRight}>Move Right</button>
        </div>
    );
};

export default CandlestickChart;








// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import dayjs from 'dayjs';
//
// const CandlestickChart = () => {
//     const [chartType, setChartType] = useState('candlestick');
//     const [lockTime, setLockTime] = useState(new Date(1538829000000).getTime());
//     const [expireTime, setExpireTime] = useState(new Date(1538834400000).getTime());
//     const [buyTime, setBuyTime] = useState(new Date(1538809200000).getTime());
//     const [sellTime, setSellTime] = useState(new Date(1538816400000).getTime());
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         // Функция для асинхронного получения данных
//         const fetchData = async () => {
//             try {
//                 // Замените этот блок кода на вашу логику получения данных в реальном времени
//                 const response = await fetch('URL_ДЛЯ_ПОЛУЧЕНИЯ_ДАННЫХ');
//                 const result = await response.json();
//                 setData(result); // Устанавливаем полученные данные в состояние
//             } catch (error) {
//                 console.error('Ошибка при получении данных:', error);
//             }
//         };
//
//         // Запускаем функцию получения данных сразу и устанавливаем интервал для обновлений
//         fetchData();
//         const interval = setInterval(fetchData, 1000); // Установите желаемый интервал обновления данных
//
//         // Функция очистки интервала при размонтировании компонента
//         return () => clearInterval(interval);
//     }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании компонента
//
//     // Преобразование данных для линейного графика
//     const lineData = data.map((item) => ({
//         x: item.x,
//         y: item.y[3],
//     }));
//
//     // Комбинированные данные для отображения на одном графике
//     const combinedData = [
//         ...data,
//         ...lineData.map((item) => ({
//             x: item.x,
//             y: item.y,
//         })),
//     ];
//
//     // Настройки графика
//     const options = {
//         chart: {
//             height: 350,
//             type: chartType,
//         },
//         title: {
//             text: `${chartType === 'candlestick' ? 'CandleStick' : 'Line'} Chart - Category X-axis`,
//             align: 'left',
//         },
//         annotations: {
//             // ... (остальной код аннотаций остается без изменений)
//         },
//         tooltip: {
//             enabled: true,
//         },
//         xaxis: {
//             type: 'datetime',
//             labels: {
//                 formatter: (val) => dayjs(val).format('MMM DD HH:mm'),
//             },
//         },
//         yaxis: {
//             tooltip: {
//                 enabled: true,
//             },
//         },
//     };
//
//     return (
//         <div id="chart">
//             <ReactApexChart
//                 options={options}
//                 series={[{ data: chartType === 'candlestick' ? data : combinedData }]}
//                 type={chartType}
//                 height={350}
//             />
//             <button
//                 onClick={() => {
//                     setChartType((prevType) => (prevType === 'candlestick' ? 'line' : 'candlestick'));
//                     setLockTime(null);
//                     setExpireTime(null);
//                 }}
//             >
//                 Переключить тип графика
//             </button>
//         </div>
//     );
// };
//
// export default CandlestickChart;
