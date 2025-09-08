import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Logs in a user.
 * @example
 ```js
// demo

loginUser('peter@parker.com', 'peter123')
    .then(() => console.log('user logged in'))
    .catch(error => console.error(error))
 ```
 *   
 * @param {string} email The user username.
 * @param {string} password The user password.   
*/

export const loginUser = (email, password) => {
    validate.email(email)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new Error('json error') })
                    .then(token => { data.saveToken(token) })

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}