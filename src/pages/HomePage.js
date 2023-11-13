import React from "react";
import {AppHeader} from "../components/Header/Header";
import {MenuTop} from "../components/MenuTop/MenuTop";
import {AppFooter, Screen} from "../components/Footer/Footer";


export const HomePage = () => {
    return (
        <>
            <Screen>
                <MenuTop/>
                <AppHeader/>
                <AppFooter/>

            </Screen>

        </>

    )
}