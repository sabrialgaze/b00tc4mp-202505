import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Adds a player to a group.
 * @example
 ```js
// demo

addPlayerToGroup('68e6e92978bd71d33dd12c7a', 'campa@nita.com')
    .then(() => console.log('Player added to group'))
    .catch(error => console.error(error))
 ```
 * @param {string} groupId The group id.
 * @param {string} playerEmail The player email.
 */

export const addPlayerToGroup = (groupId, playerEmail) => {
    validate.groupId(groupId)
    validate.email(playerEmail)

    return fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}/players/add`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${data.loadToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerEmail
        })
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 204) return

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
} 