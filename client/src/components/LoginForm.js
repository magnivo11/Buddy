import '../css/registerForm.css'
import axios from 'axios'

function LoginForm(){
return (
  <div>
  <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
  <div className="container">
    <div className="row centered-form">
      <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Buddy</h3>
          </div>
          <div className="panel-body">
              <form onSubmit={(e)=>login(e)}>
              <div className="form-group">
                      <input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                    <input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" />
                    </div>
               
                <input type="submit" defaultValue="Register" className="btn btn-info btn-block" />
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
function login(e){
    e.preventDefault();
    console.log("LOGIN START");

let request= { userName: document.getElementById('InputUserName').value,
                password: document.getElementById('InputPassword').value

}

console.log(request);

axios.post('http://localhost:8080/login',request);


}

export default LoginForm