import { validate, NotFoundError, CredentialsError, SystemError } from 'com'
import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'

export const authenticateUser = (email, password) => {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => {
                    throw new SystemError('password compare error')
                })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    const { id, role } = user

                    return { id, role }
                })
        })
}
