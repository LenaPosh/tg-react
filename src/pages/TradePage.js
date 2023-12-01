import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter} from "../components/Footer/Footer";
// import MyGraph from "../components/Trade/Trade";
// import MyGraphSecond from "../components/Trade/example";
import CandlestickChart from "../components/Trade/apexcharts";
import CandlestickChart2 from "../components/Trade/Realapex";
import './style.css'


export const TradePage = () => {
    return (
        <>
            <MenuTop/>
            {/*<MyGraph/>*/}
            {/*<MyGraphSecond/>*/}
            <CandlestickChart/>
            <div className='CandlestickChart2'>
                <CandlestickChart2/>
            </div>

            <AppFooter/>
        </>



    )
}