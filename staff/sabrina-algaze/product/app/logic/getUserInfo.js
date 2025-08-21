import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Gets user info.
 * 
 * @example
 ```js
// demo

getUserInfo()
    .then(user => console.log(user))
    .catch(error => console.error(error))
 ```
 */

export const getUserInfo = () => {
    return fetch('http://localhost:8080/users/info', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.loadToken()}`
        },

    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new Error('json error') })
                    .then(user => user)
            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError

                    throw new constructor(message)
                })
        })
}
