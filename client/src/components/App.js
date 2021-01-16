import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DataContext from '../DataContext';
import React from 'react';
import HomePage from './HomePage'
import Header from './Header';
import MyGardens from './MyGardens';
import Footer from './Footer';
import Page from './Page';
import FirstPage from './FirstPage';
import Profile from './Profile';


function App(){

    const[user,setUser]=React.useState({userName:null});
    console.log("user name is " + user.userName);
    
    
    return(

    <DataContext.Provider value={user}>
    <BrowserRouter>

         <Switch>
         <Route exact path='/login'>
                <LoginForm user={user} setUser={setUser}/>
             </Route>
             <Route exact path='/register'>
                 <RegisterForm user={user} setUser={setUser}/>
             </Route>
         <Route>
                <Header/>
                <FirstPage/>
                <MyGardens/>
                <Page/>
                <Profile/>
                <Footer/>
             </Route>
         
            

        </Switch>
    
     </BrowserRouter>

</DataContext.Provider>
    );
}
export default App;