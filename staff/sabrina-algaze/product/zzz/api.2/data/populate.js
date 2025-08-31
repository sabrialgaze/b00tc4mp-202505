import mongoose from 'mongoose'
import { User } from './models.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected'))
    .then(() => {
        const wendy = new User({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: 'wendy123' })

        return wendy.save()
            .then(() => console.log('created'))
    })
    .catch(error => console.error(error))

