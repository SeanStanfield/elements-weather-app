import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import HomepageLocationCard from "./components/HomepageLocationCard";
import React, {useState} from "react";
import {Box, Button, Container, Switch, TextField} from "@mui/material";
import {SelectedLocation} from "./components/SelectedLocation";

export const GlobalContext = React.createContext({});

function App() {

    const [useCelsius, setUseCelsius] = useState(true);
    const [cities, setCities] = useState([{name: 'London', isFavourite: true}, {name: 'Tokyo', isFavourite: true}, {name: 'Berlin', isFavourite: false}, {name: 'Prague', isFavourite: false}, {name: 'Warsaw', isFavourite: false}]);
    const [newCity, setNewCity] = useState('');
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const toggleTempMode = () =>{
        setUseCelsius(!useCelsius);
    }

    const toggleFavourite = (changedCity) =>{
        let local = [...cities];
        local.splice(local.indexOf(changedCity), 1, {name: changedCity.name, isFavourite: !changedCity.isFavourite});
       setCities(local);
    }

    const changeName = (changedCity, newValue) =>{
        let local = [...cities];
        local.splice(local.indexOf(changedCity), 1, {name: newValue, isFavourite: changedCity.isFavourite});
        setCities(local);
    }

    const deleteCity = (city)=>{
        let local = [...cities];
        local.splice(local.indexOf(city), 1);
        setCities(local);
    }

    const cityExists = (testNewCity) =>{
        cities.forEach(city =>{
            if (city.name === testNewCity)
                return true;
        })
        return false;
    }

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
        <>
            <CssBaseline />

                <GlobalContext.Provider value={{
                    useCelsius: useCelsius,
                    toggleFavourite: toggleFavourite,
                    deleteCity: deleteCity,
                    changeName: changeName,
                    setSelectedCity: setSelectedCity,
                }}>

                    <header className="App-header">
                        <section id="selected">
                            <SelectedLocation city={selectedCity} />

                        </section>
                    </header>

                    <main>
                        <Container sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p>{useCelsius ? 'Celsius' : 'Fahrenheit'}</p>
                            <Switch onChange={toggleTempMode}  label={'Celsius/Fahrenheit'} defaultChecked />
                        </Container>

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
        </>
    </div>
  );
}

export default App;
