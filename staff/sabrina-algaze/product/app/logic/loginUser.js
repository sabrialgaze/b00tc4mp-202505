import { data } from '../data'
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
    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
    if (!usernameRegex.test(username)) throw new Error('invalid username format')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!passwordRegex.test(password)) throw new Error('invalid password format')

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