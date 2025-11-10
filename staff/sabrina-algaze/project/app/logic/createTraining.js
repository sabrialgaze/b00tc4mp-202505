import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Creates a training for a group.
 * @example
 * ```js
 * // demo
 * 
 * createTraining("68e6e92978bd71d33dd12c70")
 *     .then(training => console.log(training))
 *     .catch(error => console.error(error))
 * ```
 * @param {*} groupId The group id. 
 * 
 */

export const createTraining = groupId => {
    return fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.loadToken()}`
        },
        body: JSON.stringify({ groupId })
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
