import React from "react";
import WeatherDetail from "./WeatherDetail";


const WeatherList = (props) => {
    if (props.weatherItems == null || props.weatherItems.length === 0) {
        return <p>Warning! Project Gamma Weather Systems offline.</p>
    }



    return (
        <div>
            <WeatherDetail/>
        </div>
    )
}
 export default WeatherList;