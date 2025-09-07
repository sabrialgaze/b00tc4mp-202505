import { validate, errors, SystemError } from 'com'

/**
 * Registers a user.
 * 
 * @example
 ```js
// demo

registerUser('Peter Parker', 'peter@parker.com', '123123123')
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
 ```
 * 
 * @param {string} name The user name.
 * @param {string} email The user email.
 * @param {string} password The user password.
 */

export const registerUser = (name, email, password) => {
    validate.name(name)
    validate.email(email)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
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