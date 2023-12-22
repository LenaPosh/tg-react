import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter} from "../components/Footer/Footer";
import CandlestickChart from "../components/Trade/apexcharts";
import './style.css'


export const TradePage = () => {
    return (
        <>
            <MenuTop/>
            <CandlestickChart/>


            <AppFooter/>
        </>



    )
}