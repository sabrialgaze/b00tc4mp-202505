import mongoose, { Types } from 'mongoose'
const { ObjectId } = Types


export const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    saved: [{
        type: ObjectId,
        ref: 'Post'
    }]
})

export const Post = mongoose.model('Post', {
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    archived: {
        type: Boolean,
        default: false
    }
})