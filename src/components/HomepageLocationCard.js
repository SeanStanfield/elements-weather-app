import React, {useContext, useEffect, useState} from "react";
import Card from '@mui/material/Card';
import axios from "axios";
import {GlobalContext} from "../App";
import {Button, CardActionArea, CardActions, CardContent} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSnowflake} from "@fortawesome/free-solid-svg-icons";
import {WeatherIcon} from "./WeatherIcon";
const HomepageLocationCard = ({data}) => {

    const context = useContext(GlobalContext);

    const [currentCondition, setCurrentCondition] = useState('unset');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newCityValue, setNewCityValue] = useState('');

    let shownTemp = context.useCelsius ? currentCondition.currentTempC : currentCondition.currentTempF;

    function getWeatherData(data) {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=43a7112254df448c886211019221803&q=${data.name}&aqi=no`)
            .then((response) => {
                setCurrentCondition({
                        currentTempC: response.data.current.temp_c,
                        currentTempF: response.data.current.temp_f,
                        condition: response.data.current.condition.text,

                    }


                );
            }).catch((error) => {
            console.log(error);
        });
    }

    useEffect( () =>{
        getWeatherData(data);

    }, [data])

    const toggleFav = () =>{
        console.log('called from inside', data.isFavourite);

        context.toggleFavourite(data);
    }

    const deleteMe = ()=>{
        context.deleteCity(data);
    }

    const openDialog = ()=>{
        setDialogOpen(true);
    }

    const closeDialog = () =>{
        setDialogOpen(false);
    }

    const changeCityName = () =>{
        context.changeName(data, newCityValue);
        closeDialog();
    }

    return(
        <>
            <Card varient={'outlined'} sx={{m: 2}}>
            <CardActionArea onClick={() => context.setSelectedCity(data)}>
                <CardContent>
                    <h2>{data.name}</h2>
                    <WeatherIcon temp={shownTemp} condition={currentCondition.condition}/>
                </CardContent>


            </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={toggleFav}>
                        {data.isFavourite ? 'Unfavourite' : 'Favourite'}
                    </Button>
                    <Button size="small" color="warning" onClick={deleteMe}>Delete City</Button>
                    <Button size="small" color="secondary" onClick={openDialog}>Edit City</Button>
                </CardActions>
            </Card>

            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Change Location</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the new city name below
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCityValue}
                        onChange={event => setNewCityValue(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeCityName}>Change Name</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default HomepageLocationCard;