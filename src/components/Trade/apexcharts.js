import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

const CandlestickChart = () => {
    const [chartType, setChartType] = useState('candlestick');
    const [lockTime, setLockTime] = useState(new Date(1538829000000).getTime());
    const [expireTime, setExpireTime] = useState(new Date(1538834400000).getTime());
    const [buyTime, setBuyTime] = useState(new Date(1538809200000).getTime());
    const [sellTime, setSellTime] = useState(new Date(1538816400000).getTime());
    const chartRef = useRef(null);

    const [chartData, setChartData] = useState([]);
    const [redEntry, setRedEntry] = useState(null);
    const [greenEntry, setGreenEntry] = useState(null);

    const generateRandomDataPoint = () => {
        const newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() + 1);

        const newDataPoint = {
            x: newDate.getTime(),
            y: [
                (Math.random() * (7000 - 6500) + 6500).toFixed(1), // округление до 2 знаков после запятой
                (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                (Math.random() * (7000 - 6500) + 6500).toFixed(1),
                (Math.random() * (7000 - 6500) + 6500).toFixed(1),
            ],
        };

        setChartData((prevData) => [...prevData, newDataPoint]);
    };

    useEffect(() => {
        const interval = setInterval(generateRandomDataPoint, 700);

        return () => clearInterval(interval);
    }, []);

    const lineData = chartData.map((item) => ({
        x: item.x,
        y: item.y && item.y.length >= 4 ? item.y[3] : 0,
    }));

    const handleEntryPrice = (color) => {
        const currentData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

        if (currentData !== null) {
            const entry = { time: currentData.x, price: currentData.y[3] };

            if (color === 'red' && !redEntry) {
                setRedEntry(entry);
            } else if (color === 'green' && !greenEntry) {
                setGreenEntry(entry);
            }
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

    const buyPoint = chartData.length > 0 ? {
        x: buyTime,
        y: chartData[chartData.length - 1]?.y[3],
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
    } : null;

    const sellPoint = chartData.length > 0 ? {
        x: sellTime,
        y: chartData[chartData.length - 1]?.y[3],
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
                zoomedArea: {
                    fill: {
                        color: '#90CAF9',
                        opacity: 0.4,
                    },
                    stroke: {
                        color: '#0D47A1',
                        opacity: 0.7,
                        width: 1,
                    },
                },
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

    return (
        <div id="chart" style={{ marginTop: '40px' }}>
            <ReactApexChart
                options={options}
                series={[{ data: chartType === 'candlestick' ? chartData : lineData }]}
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
                    setLockTime(null);
                    setExpireTime(null);
                }}
            >
                Переключить тип графика
            </button>
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
