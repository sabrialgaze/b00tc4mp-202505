import { validate, NotFoundError, SystemError } from 'com'
import { User } from '../data/models.js'

export const getUserInfo = userId => {
    validate.userId(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            user = user.toObject()

            delete user.password

            delete user.saved

            return user
        })
}