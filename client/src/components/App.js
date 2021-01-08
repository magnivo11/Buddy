import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function App(){
    return(
    
    <BrowserRouter>

         <Switch>
             <Route exact path='/login'>
                <LoginForm/>
             </Route>
             <Route exact path='/register'>
                 <RegisterForm/>
             </Route>







        </Switch>
    
    
    
    
     </BrowserRouter>


    );
}
export default App;