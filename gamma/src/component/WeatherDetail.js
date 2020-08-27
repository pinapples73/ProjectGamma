import React from "react";

const WeatherDetail = (props) => {
    if (props.weatherItems == null || props.weatherItems.length === 0) {
        return <p className="button2">Warning! Project Gamma Weather Systems offline.</p>
    }
    console.log(props.weatherItems)

    const listItems = props.weatherItems.consolidated_weather.map(weather => {
        return (
            <div>
                <p> WIND SPEED:&nbsp;{weather.wind_speed.toFixed(2) * 3.54} m/ph </p>
                <p> AIR PRESSURE:&nbsp;{weather.air_pressure.toFixed(2) * 2} hPa </p>
                <p> TEMPERATURE:&nbsp;{weather.the_temp.toFixed(2) * 5}  °C</p>
                <p> VISIBILITY:&nbsp;{weather.visibility.toFixed(2) * -34} nm</p>
            </div>

        )
    })


    return(
            <div className="button2">
                <p>AREA:&nbsp;{props.weatherItems.title}</p>
                <p>TIME:&nbsp;{props.weatherItems.time}</p>
                <div>
                    {listItems[0]}
                </div>
            </div>
    )

}

export default WeatherDetail;
