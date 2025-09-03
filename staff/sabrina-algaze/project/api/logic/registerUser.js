import { validate, DuplicityError, SystemError } from 'com'
import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'

export const registerUser = (name, email, password) => {
    validate.name(name)
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 10)
                .catch(error => {
                    throw new SystemError('password hash error')
                })
                .then(hash => {
                    return User.create({ name, email, password: hash })
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(user => { })
                })
        })

}
