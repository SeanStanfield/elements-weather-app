import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../App";
import {WeatherIcon} from "./WeatherIcon";
import {Box} from "@mui/material";
import Card from "@mui/material/Card";

export const SelectedLocation = ({city})=>{

    const [currentForecast, setCurrentForecast] = useState('unset');
    const context = useContext(GlobalContext);

    //get forecast data for the week ahead
    function getForecast(city) {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=43a7112254df448c886211019221803&q=${city.name}&days=5&aqi=no&alerts=no`)
            .then((response) => {
                setCurrentForecast({
                        currentTempC: response.data.current.temp_c,
                        currentTempF: response.data.current.temp_f,
                        forecast: response.data.forecast.forecastday,
                    }

                );
            }).catch((error) => {
            console.log(error);
        });
    }

    useEffect( () =>{
        getForecast(city);

    }, [city])

    return( <Box sx={{bgcolor: '#E8E8E8', paddingTop: 2}}>

        <h1 style={{padding: 0, marginTop: 0}}>The week ahead for {city.name}</h1>
        <h3>Current Temp:{currentForecast.currentTempC}</h3>

        <Box component="span" sx={{ p: 2,  display: 'flex', flexWrap: 'wrap'}}>

        {currentForecast === 'unset' ? <p>Waiting for weather data</p>:

        currentForecast.forecast.map(child =>{
            return(
                <Card sx={{m: 2, p: 1, flex:1, flexBasis: 220}} key={child.date_epoch}>
                    <h5>{child.date}</h5>
                    <WeatherIcon condition={child.day.condition.text} temp={context.useCelsius ? child.day.avgtemp_c : child.day.avgtemp_f}/>
                </Card>
            )
        })}
        </Box>
    </Box>)
}