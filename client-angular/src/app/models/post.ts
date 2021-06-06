export interface Post {
    _id: String,
    content: String,
    status: String,
    comments: Array<String>,
    userID: String,
    photoID: String, 
    published: Date,
    lastUpdated: Date,
}
