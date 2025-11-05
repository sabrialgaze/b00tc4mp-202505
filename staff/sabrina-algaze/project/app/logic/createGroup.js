import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Creates a group.
 * @example
 * ```js
 * // demo
 * 
 * createGroup("Jueves", "thursday", "19:00", "Barceloneta", "pepito@grillo.com")
 *     .then(group => console.log(group))
 *     .catch(error => console.error(error))
 * ```
 * @param {*} name The group name.
 * @param {*} day The group day.
 * @param {*} time The group time.
 * @param {*} location The group location.
 * @param {*} coachEmail The coach email.
 * 
 */

export const createGroup = (name, day, time, location, coachEmail) => {
    return fetch(`${import.meta.env.VITE_API_URL}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.loadToken()}`
        },
        body: JSON.stringify({
            name,
            day,
            time,
            location,
            coachEmail
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