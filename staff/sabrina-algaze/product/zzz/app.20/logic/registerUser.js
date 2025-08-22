import { validate, errors, SystemError } from 'com'

/**
 * Registers a user.
 * 
 * @example
 ```js
// demo

registerUser('Sabrina2', 'sabrina2@mail.com', 'sabrina2', '123123123')
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
 ```
 * 
 * @param {string} name The user name.
 * @param {string} email The user email.
 * @param {string} username The user username.
 * @param {string} password The user password.
 */
export const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            username,
            password
        })
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 201) return

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}