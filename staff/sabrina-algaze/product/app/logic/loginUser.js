import { data } from '../data'
import { validate } from 'com'
/**
 * Logs in a user.
 * @example
 ```js
// demo

loginUser('pepitogrillo', 'pepito123')
    .then(() => console.log('user logged in'))
    .catch(error => console.error(error))
 ```
 *   
 * @param {string} username The user username.
 * @param {string} password The user password.   
*/
export const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch('http://localhost:8080/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new Error('json error') })
                    .then(userId => { data.saveUserId(userId) })

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}