import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter} from "../components/Footer/Footer";
import CandlestickChart from "../components/Trade/apexcharts";
import './style.css'
import ApexChartTwo from "../components/Trade/ApexchartTwo";


export const TradePage = () => {
    return (
        <>
            <MenuTop/>
            {/*<MyGraph/>*/}
            {/*<MyGraphSecond/>*/}
            <CandlestickChart/>
            <div className='CandlestickChart2'>
                <ApexChartTwo/>
            </div>

            <AppFooter/>
        </>



    )
}