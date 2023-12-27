import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter} from "../components/Footer/Footer";
// import CandlestickChart from "../components/Trade/apexcharts";
import './style.css'
import MyGraphSecond from "../components/Trade/example";
// import NewGraph from "../components/Trade/NewGraph";


export const TradePage = () => {
    return (
        <>
            <MenuTop/>
            {/*<CandlestickChart/>*/}
            {/*<NewGraph/>*/}
            <MyGraphSecond/>


            <AppFooter/>
        </>



    )
}