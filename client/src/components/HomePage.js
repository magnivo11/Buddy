function HomePage({user}){
    console.log("user name from login page is: "+ user.userName);
    return(
        <h1> hi {user.userName}</h1>
    );
}
export default HomePage;