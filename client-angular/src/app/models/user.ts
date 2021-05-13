export interface User {
    name: String;
    lastName: String;
    email: String;
    description: String;
    password: String;
    isAdmin: Boolean;
    gardens: [];  
    posts: [];
}