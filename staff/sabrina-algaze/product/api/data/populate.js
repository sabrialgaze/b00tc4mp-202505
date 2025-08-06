import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

let users

client.connect()
    .then(() => {
        console.log('Connected to MongoDB')

        const db = client.db('test')

        users = db.collection('users')

        return users.deleteMany()
    })
    .then(() => {
        // TODO crud
        return users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: 'wendy123' })
    })
    .then(() => {
        return users.insertMany([
            { name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: 'pepito123' },
            { name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: 'peter123' },
            { name: 'James Hook', email: 'james@hook.com', username: 'jameshook', password: 'james123' },
            { name: 'Campanita', email: 'campa@nita.com', username: 'campanita', password: 'campanita123' }
        ])
    })
    .then(() => {
        return users.updateOne(
            { username: 'peterpan' },
            { $set: { name: 'Peter Flan' } }
        )
    })
    .then(() => {
        return users.deleteOne({ username: 'peterpan' })
    })

    .then(() => console.log('done'))
    .catch(error => {
        console.error(error)
    })

