import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Gets the groups for the current player.
 * @example
 ```js
// demo

getGroupsForPlayer()
    .then(groups => console.log(groups))
    .catch(error => console.error(error))
 ```
 *     
 */

export const getGroupsForPlayer = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/groups`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.loadToken()}`
        }
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new Error('json error') })

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}