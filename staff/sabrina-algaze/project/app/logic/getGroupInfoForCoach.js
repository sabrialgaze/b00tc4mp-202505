import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Gets the players of a group.
 * @example
    ```js
// demo

getGroupInfoForCoach('68df91556d15402089312e9f')
    .then(players => console.log(players))
    .catch(error => console.error(error))
```
 * @param {string} groupId The group id.
 */

export const getGroupInfoForCoach = (groupId) => {
    validate.groupId(groupId)

    return fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}/info`, {
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
                    .then(group => group)
            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}