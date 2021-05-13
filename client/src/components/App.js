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
import Profile from './Social Network/Profile';
import AboutUs from './AboutUs';
import Notifications from './Notifications/Notifications';
import NewsFeed from './Social Network/NewsFeed';
import io from "socket.io-client";
import EditGarden from './EditGarden';
import EditUser from './EditUser';
import EditPlantByUser from './EditPlantByUser';
import EditPlantByAdmin from './EditPlantByAdmin';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import Resetscreen from './Resetscreen';


const socket = io.connect("http://localhost:8080");

function App() {

    if(!window.sessionStorage.getItem('userID')&&!(window.location.toString().includes("reset")))
    window.history.replaceState(null, "New Page Title", "/")

const [render,forceRender]=React.useState(false);
const[newNotifications,setNewNotifications]=React.useState(0);


    var userID = window.sessionStorage.getItem('userID')
    React.useEffect(() => {
        if (userID) {
            axios.get('http://localhost:8080/user/allUnReadnotifications/' + userID).then(Response => {
                setNewNotifications(Response.data.length)

            })
        }

    }, [])



    return (

        <DataContext.Provider value={{ render: render, forceRender: forceRender, newNotifications: newNotifications, setNewNotifications: setNewNotifications }}>
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

                    <Route exact path='/editplantbyadmin/:plantID'>
                        <Header /> <EditPlantByAdmin /></Route>

                    <Route exact path='/mygardens'>
                        <Header /> <MyGardens /></Route>

                    <Route exact path='/profile/:userID'>
                        <Header /><Profile /></Route>

                    <Route exact path='/forgotpassword'>
                        <ForgotPassword /></Route>

                    <Route exact path='/reset/:token'>
                        <Resetscreen /></Route>

                    <Route path="/biblesearch" component={() => <><Header /><BibleSearch /></>} />

                    <Route exact path='/plantsbible'>
                        <Header /><PlantsBible /> </Route>


                    <Route exact path='/newsFeed'>
                        <Header /><NewsFeed /></Route>

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
                {/* <Footer /> */}
            </BrowserRouter>

        </DataContext.Provider>
    );
}
export default App;