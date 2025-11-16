import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Removes a player from a group.
 * @example
 ```js
// demo

removePlayerFromGroup('68e6e92978bd71d33dd12c7b', '68e6e92978bd71d33dd12c7c')
    .then(() => console.log('Player removed from group'))
    .catch(error => console.error(error))
 ```
 * @param {string} groupId The group id.
 * @param {string} playerId The player id.
 */

export const removePlayerFromGroup = (groupId, playerId) => {
    validate.groupId(groupId)
    validate.userId(playerId)

    return fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}/players/remove`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${data.loadToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerId
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