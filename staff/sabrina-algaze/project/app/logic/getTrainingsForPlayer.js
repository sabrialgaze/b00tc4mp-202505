import { data } from '../data/index.js'
import { validate, errors, SystemError } from 'com'

/**
 * Gets the trainings for a player.
 * @example
 ```js
// demo

getTrainingsForPlayer('688f91556d15402089312e9a')
    .then(trainings => console.log(trainings))
    .catch(error => console.error(error))
 ```
 *   
 * @param {string} playerId The player id.   
 */

export const getTrainingsForPlayer = playerId => {
    validate.userId(playerId)

    return fetch(`${import.meta.env.VITE_API_URL}/trainings/player`, {
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
                    .then(trainings => trainings)
            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}