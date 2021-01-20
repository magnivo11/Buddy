const User=require('../schema/userSchema'); 

const getUserByEmail = (request,response)=>{
    //const user=
    User.findOne({email:request.params.email},(err,user)=>{
        if(err)
        {
        response.send(err)}
        else{
        response.send(user)}
    })
};

const createUser = (request,response)=>{
   
    const newUser={
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        isAdmin:false,
        gardens:[],
        posts:[],
    }
    User.insertMany([newUser]);
response.send('new user is now registered');
}


const updateUser = (request,response)=>{

    const userUpdate={
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password
        }
        
   User.findOneAndUpdate({email:request.body.email},userUpdate,(err,user)=>{
       if(err){
       response.send(err);}
       else{
       response.send('user updated successfully');}
   }); 
}

const deleteUser = (request,response)=>{
    User.deleteOne({email:request.body.email})
}


module.exports = {getUserByEmail,createUser,updateUser,deleteUser}; 