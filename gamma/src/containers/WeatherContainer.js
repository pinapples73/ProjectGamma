import React, {Component} from 'react';
import WeatherDetail from '../component/WeatherDetail';


class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherItems: []
        }
    }

    componentDidMount() {
        this.loadWeather()
    }

    loadWeather() {
        fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/21125/')
            .then(res => res.json())
            .then((data) => this.setState({weatherItems: data}));

    };


render()
{
    return (
        <div>
            <h3>Weather Terminal</h3>
            <WeatherDetail
                weatherItems={this.state.weatherItems}
            />
        </div>

    )
}
}



export default WeatherContainer;