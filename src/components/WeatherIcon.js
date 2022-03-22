import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faCloudRain, faCloudSun, faSun} from "@fortawesome/free-solid-svg-icons";

export const WeatherIcon = ({condition, temp}) => {

    const [iconStyle, setIconStyle] = useState(faCloudSun);

    useEffect(()=>{
        if (condition && temp){
        if (condition.toLowerCase().includes('sunny')){
            setIconStyle(faSun);
        }else if(condition.toLowerCase().includes('cloud')) {
            setIconStyle(faCloud);
        }else if (condition.toLowerCase().includes('rain')){
            setIconStyle(faCloudRain);
        }
        else{
            setIconStyle(faCloudSun);
        }
        }
        console.log('ran use effect', condition);

    }, [condition, temp])

    return(
        <div>

            <FontAwesomeIcon size={"2x"} icon={iconStyle} />
            <p style={{fontSize: 16}}>Expected temperature is {temp} degrees and conditions will be {condition}</p>
        </div>
    );
}