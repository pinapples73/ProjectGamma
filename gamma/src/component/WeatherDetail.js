import React from "react";

const WeatherDetail = (props) => {
    if (props.weatherItems == null || props.weatherItems.length === 0) {
        return <p>Warning! Project Gamma Weather Systems offline.</p>
    }
    console.log(props.weatherItems)

    const listItems = props.weatherItems.consolidated_weather.map(weather => {
        return <p>WIND SPEED:{weather.wind_speed * 3.54} AIR PRESSURE:{weather.air_pressure * 2} TEMPERATURE:{weather.the_temp * 5} VISIBILITY:{weather.visibility * -34}</p>

    })


    return(
            <div >
                <p>AREA:{props.weatherItems.title}</p>
                <p>TIME:{props.weatherItems.time}</p>
                <p>
                    {listItems[0]}
                </p>
            </div>
    )

}

export default WeatherDetail;
