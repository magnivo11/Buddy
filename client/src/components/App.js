import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DataContext from '../DataContext';
import React from 'react';
import AddAPlantByUser from './AddAPlantByUser';
import HomePage from './HomePage'
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
const socket = io.connect("http://localhost:8080") ;

function App(){

    const[user,setUser]=React.useState({email:null,name:null,lastName:null,_id:null,isAdmin:false,gardens:[]});
    console.log("user is: " + user._id);
    
    
    return(

    <DataContext.Provider value={user}>
    <BrowserRouter>
   
 
    <Switch>
     
            <Route exact path='/login'>
                <LoginForm user={user} setUser={setUser}/></Route>

             <Route exact path='/register'>
                 <RegisterForm/></Route>

                 <Route exact path='/addaplantbyuser'>
                 <Header/><AddAPlantByUser/></Route>

             <Route exact path='/mygardens'>
             <Header/> <MyGardens/></Route>

             <Route exact path='/profile'>
             <Header/><Profile/></Route>

             <Route exact path='/plantsbible'>
             <Header/><PlantsBible/> </Route>

             <Route exact path='/singlegarden'>
             <Header/><SingleGarden/> </Route>

             <Route exact path='/aboutus'>
             <Header/><AboutUs/></Route>



             <Route exact path='/addaplantbyadmin'>
            <Header/><AddAPlantByAdmin/></Route>

            <Route exact path='/addagarden'>
            <Header/><AddAGarden/></Route>

            <Route exact path='/plant'>
            <Header/><Plant/></Route>

             <Route exact path='/notifications'>
             <Header/><Notifications/></Route>

                 
             <Route exact path='/plantsbiblesingleplant'>
             <Header/><PlantsBibleSinglePlant/></Route>
    </Switch>
    <FirstPage/>
     </BrowserRouter>

</DataContext.Provider>
    );
}
export default App;