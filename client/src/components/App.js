import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DataContext from '../DataContext';
import React from 'react';
import HomePage from './HomePage'
import Header from './Header';
import MyGardens from './MyGardens';
import SingleGarden from './SingleGarden';
import AddAPlant from './AddAPlant';
import AddAGarden from './AddAGarden';
import Plant from './PlantPage';

import PlantsBible from './PlantsBible';
import FirstPage from './FirstPage';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Notifications from './Notifications';
//import io from "socket.io-client"; 
//const socket = io.connect("http://localhost:8080") ;

function App(){

    const[user,setUser]=React.useState({email:null});
    console.log("user email is " + user.email);
    
    
    return(

    <DataContext.Provider value={user}>
    <BrowserRouter>
    <Header/>
 
    <Switch>
     
            <Route exact path='/login'>
                <LoginForm user={user} setUser={setUser}/></Route>

             <Route exact path='/register'>
                 <RegisterForm/></Route>


             <Route exact path='/mygardens'>
                 <MyGardens/></Route>

             <Route exact path='/profile'>
                 <Profile/></Route>

             <Route exact path='/plantsbible'>
                 <PlantsBible/> </Route>

             <Route exact path='/singlegarden'>
                 <SingleGarden/> </Route>

             <Route exact path='/aboutus'>
                 <AboutUs/></Route>

            <Route exact path='/addaplant'>
                 <AddAPlant/></Route>

            <Route exact path='/addagarden'>
                 <AddAGarden/></Route>

            <Route exact path='/plant'>
                 <Plant/></Route>

             <Route exact path='/notifications'>
                 <Notifications/></Route>
    </Switch>
    <FirstPage/>
     </BrowserRouter>

</DataContext.Provider>
    );
}
export default App;