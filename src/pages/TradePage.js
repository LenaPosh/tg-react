import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter} from "../components/Footer/Footer";
// import MyGraph from "../components/Trade/Trade";
// import MyGraphSecond from "../components/Trade/example";
import CandlestickChart from "../components/Trade/apexcharts";


export const TradePage = () => {
    return (
        <>
            <MenuTop/>
            {/*<MyGraph/>*/}
            {/*<MyGraphSecond/>*/}
            <CandlestickChart/>
            <AppFooter/>
        </>



    )
}