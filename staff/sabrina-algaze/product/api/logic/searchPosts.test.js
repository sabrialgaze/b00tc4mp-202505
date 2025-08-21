import mongoose from 'mongoose'
import { searchPosts } from './searchPosts.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return searchPosts('6894a5f3691146bd106709f3', 'happy')
            .then(posts => console.log(posts))
    })
    .catch(error => console.error(error))