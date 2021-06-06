export interface User {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    description: String,
    password: String,
    isAdmin: Boolean,
    gardens: Array<String>,    
    posts: Array<String>,
    
    created: Date,
    lastUpdated: Date,
    photoID: String,
}