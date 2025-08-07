import mongoose from 'mongoose'
import { getUserInfo } from './getUserInfo.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return getUserInfo('68948cf4155f7783690dbdcf')
    })
    .then(user => console.log(user))
    .catch(error => console.error(error))