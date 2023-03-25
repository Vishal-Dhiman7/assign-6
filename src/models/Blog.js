const mongooose = require('mongoose');

const blogSchema = mongooose.Schema({
    // Your code goes here
    ObjectID : Number,
    topic : String,
    descroption : String,
    posted_at : String,
    Posted_by : String
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;

