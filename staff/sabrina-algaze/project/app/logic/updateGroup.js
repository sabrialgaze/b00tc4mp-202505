import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Updates a group.
 * @example
 * ```js
 * // demo
 * 
 * updateGroup('68e6e92978bd71d33dd12c7b', {name: 'Group A', day: 'Monday', time: '10:00', location: 'Location A'})
 *     .then(group => console.log(group))
 *     .catch(error => console.error(error))
 * ```
 * @param {string} groupId The group id.
 * @param {Object} updates The updates object containing the fields to update.
 * @param {string} updates.name The group name.
 * @param {string} updates.day The group day.
 * @param {string} updates.time The group time.
 * @param {string} updates.location The group location.
 */

export const updateGroup = (groupId, updates) => {
    validate.groupId(groupId)
    validate.updates(updates)

    return fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${data.loadToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
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