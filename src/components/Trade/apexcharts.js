


import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

const CandlestickChart = () => {
    const [chartType, setChartType] = useState('candlestick');
    const [lockTime, setLockTime] = useState(new Date(1538829000000).getTime());
    const [expireTime, setExpireTime] = useState(new Date(1538834400000).getTime());
    const [buyTime, setBuyTime] = useState(new Date(1538809200000).getTime()); // Устанавливаем время покупки при загрузке
    const [sellTime, setSellTime] = useState(new Date(1538816400000).getTime());

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
        y: item.y[3],
    }));

    const options = {
        chart: {
            height: 350,
            type: chartType,
        },
        title: {
            text: `${chartType === 'candlestick' ? 'CandleStick' : 'Line'} Chart - Category X-axis`,
            align: 'left',
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
                    y: chartData[chartData.length - 1]?.y[3], // Получаем y координату последней добавленной точки данных
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
                    y: chartData[chartData.length - 1]?.y[3], // Получаем y координату последней добавленной точки данных
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
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={[{ data: chartType === 'candlestick' ? chartData : lineData }]} type={chartType} height={350} />
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
