import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import HomepageLocationCard from "./components/HomepageLocationCard";
import React, {useEffect, useState} from "react";
import {Box, Button, Container, Switch, TextField} from "@mui/material";
import {SelectedLocation} from "./components/SelectedLocation";

//aim to prevent prop drilling caused by states needed everywhere, e.g. useCelsius
export const GlobalContext = React.createContext({});

function App() {

    //grab existing data from local storage if it exists
    if (localStorage.getItem('cities') === null){
        localStorage.setItem('cities', JSON.stringify([{name: 'London', isFavourite: true}, {name: 'Tokyo', isFavourite: true}, {name: 'Berlin', isFavourite: false}, {name: 'Prague', isFavourite: false}, {name: 'Warsaw', isFavourite: false}]));
    }
    if(localStorage.getItem('useCelsius') === null){
        localStorage.setItem('useCelsius', 'true');
    }
    if(localStorage.getItem('selectedCity') === null){
        localStorage.setItem('selectedCity', JSON.stringify({name: 'London', isFavourite: true}));
    }

    //setup initial application state from local storage
    const [useCelsius, setUseCelsius] = useState(JSON.parse(localStorage.getItem('useCelsius')));
    const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')));
    const [newCity, setNewCity] = useState('');
    const [selectedCity, setSelectedCity] = useState(JSON.parse(localStorage.getItem('selectedCity')));

    //change temperature mode
    const toggleTempMode = () =>{
        setUseCelsius(!useCelsius);
    }

    //update local storage when app state changes
    useEffect(() =>{
        localStorage.setItem('cities', JSON.stringify(cities));
        console.log('blank', localStorage.getItem('doesnt exist'));
    },[cities]);

    useEffect(() =>{
        localStorage.setItem('useCelsius', JSON.stringify(useCelsius));
    },[useCelsius]);

    useEffect(() =>{
        localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
    },[selectedCity]);

    //update cities array with edited city
    const toggleFavourite = (changedCity) =>{
        let local = [...cities];
        local.splice(local.indexOf(changedCity), 1, {name: changedCity.name, isFavourite: !changedCity.isFavourite});
       setCities(local);
    }

    //update cities with the changed city name
    const changeName = (changedCity, newValue) =>{
        let local = [...cities];
        local.splice(local.indexOf(changedCity), 1, {name: newValue, isFavourite: changedCity.isFavourite});
        setCities(local);
    }

    //delete the selected city
    const deleteCity = (city)=>{
        let local = [...cities];
        local.splice(local.indexOf(city), 1);
        setCities(local);
    }

    //check if a city already exists
    const cityExists = (testNewCity) =>{
        cities.forEach(city =>{
            if (city.name === testNewCity)
                return true;
        })
        return false;
    }

    //add a new city to the app
    const createNewCity = ()=>{
        if (newCity !== '') {
            if (!cityExists(newCity)) {
                let local = [...cities];
                local.push({name: newCity, isFavourite: false});
                setCities(local);
                setNewCity('');
            }
        }
    }

  return (
    <div className="App">
            <CssBaseline />
                <GlobalContext.Provider value={{
                    useCelsius: useCelsius,
                    toggleFavourite: toggleFavourite,
                    deleteCity: deleteCity,
                    changeName: changeName,
                    setSelectedCity: setSelectedCity,
                }}>

                    {/*Area at top of app for selected location*/}
                    <SelectedLocation city={selectedCity} />

                    <main>
                        {/*Celsius/Fahrenheit switch*/}
                        <Container sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p>{useCelsius ? 'Celsius' : 'Fahrenheit'}</p>
                            <Switch onChange={toggleTempMode}  label={'Celsius/Fahrenheit'} defaultChecked />
                        </Container>

                        {/*Add new City Button*/}
                        <Container sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <TextField id="outlined-basic" label="New City" variant="outlined" value={newCity} onChange={event => setNewCity(event.target.value)}/>
                            <Button sx={{m: 2, p:2}} size="small" colour="primary" variant="contained" onClick={createNewCity}>Add new City</Button>
                        </Container>


                        <h3 className="separator">Favourites</h3>

                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        {cities.filter(x => x!== selectedCity).map(city => {
                            if(city.isFavourite){
                                return <HomepageLocationCard data={city} key = {city.name}/>
                            } else {
                                return ''}
                        })}
                        </Box>

                        <h3 className="separator">Other Cities</h3>

                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        {cities.filter(x => x!== selectedCity).map(city => {
                            if(!city.isFavourite){
                                return <HomepageLocationCard data={city} key = {city.name}/>
                            } else {
                                return ''}
                        })}
                        </Box>

                    </main>
                </GlobalContext.Provider>
    </div>
  );
}

export default App;
