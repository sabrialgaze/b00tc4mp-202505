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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['player', 'coach'],
        default: 'player'
    }
})

export const Group = mongoose.model('Group', {
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    },
    players: [{
        type: ObjectId,
        ref: 'User'
    }],

    day: {
        type: String,
        required: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },

    time: {
        type: String,
        required: true,
        format: 'HH:mm'
    },

    location: {
        type: String,
        required: true
    },

    coach: {
        type: ObjectId,
        ref: 'User'
    }
})

export const Training = mongoose.model('Training', {
    group: {
        type: ObjectId,
        ref: 'Group',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    coach: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    joined: [{
        type: ObjectId,
        ref: 'User'
    }],
    invited: [{
        type: ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        required: true,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
})

export const Payment = mongoose.model('Payment', {
    player: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: String,
        required: true,
        enum: ['monthly', 'daily']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    group: {
        type: ObjectId,
        ref: 'Group',
        required: true
    }
})
