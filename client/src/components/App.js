import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DataContext from '../DataContext';
import React from 'react';
import AddAPlantByUser from './AddAPlantByUser';
import Footer from './Footer';
import BibleSearch from './BibleSearch';
import Header from './Header';
import MyGardens from './MyGardens';
import SingleGarden from './SingleGarden';
import AddAPlantByAdmin from './AddAPlantByAdmin';
import AddAGarden from './AddAGarden';
import Plant from './PlantPage';
import PlantsBibleSinglePlant from './PlantsBibleSinglePlant';
import PlantsBible from './PlantsBible';
import FirstPage from './FirstPage';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Notifications from './Notifications';
import io from "socket.io-client";
import EditGarden from './EditGarden';
import EditUser from './EditUser';
import EditPlantByUser from './EditPlantByUser';
const socket = io.connect("http://localhost:8080");

function App() {

    return (

        <DataContext.Provider>
            <BrowserRouter>

                 <Switch>

                    <Route exact path='/'>
                        <FirstPage /></Route>

                    <Route exact path='/login'>
                        <LoginForm /></Route>

                    <Route exact path='/register'>
                        <RegisterForm /></Route>

                    <Route exact path='/addaplantbyuser/:gardenID'>
                        <Header /><AddAPlantByUser /></Route>

                    <Route exact path='/editgarden/:gardenID'>
                        <Header /> <EditGarden /></Route>

                    <Route exact path='/edituser'>
                        <Header /> <EditUser /></Route>

                    <Route exact path='/editplant/:plantID'>
                        <Header /> <EditPlantByUser /></Route>

                    <Route exact path='/mygardens'>
                        <Header /> <MyGardens /></Route>

                    <Route exact path='/profile'>
                        <Header /><Profile /></Route>

                    {/* <Route path='/biblesearch'>
                        <Header /><BibleSearch /> </Route> */}

                    <Route path="/biblesearch" component={() => <><Header /><BibleSearch /></>} />

                    <Route exact path='/plantsbible'>
                        <Header /><PlantsBible /> </Route>

                    <Route exact path='/singlegarden/:gardenID' component={() => <><Header /><SingleGarden /></>} />

                    <Route exact path='/aboutus'>
                        <Header /><AboutUs /></Route>

                    <Route exact path='/addaplantbyadmin'>
                        <Header /><AddAPlantByAdmin /></Route>

                    <Route exact path='/addagarden'>
                        <Header /><AddAGarden /></Route>

                    <Route exact path='/plant/:PlantID'>
                        <Header /><Plant /></Route>

                    <Route exact path='/notifications'>
                        <Header /><Notifications /></Route>

                    <Route exact path='/plantsbiblesingleplant/:plantID'>
                        <Header /><PlantsBibleSinglePlant /></Route>
                </Switch>
                <Footer />
            </BrowserRouter>

        </DataContext.Provider>
    );
}
export default App;