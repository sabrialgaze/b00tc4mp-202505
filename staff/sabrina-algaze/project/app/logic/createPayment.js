import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Creates a payment for a player in a group.
 * @example
 * ```js
 * // demo
 * 
 * createPayment("68e6e92978bd71d33dd12c70", "monthly")
 *     .then(payment => console.log(payment))
 *     .catch(error => console.error(error))
 * ```
 * @param {*} groupId The group id. 
 * @param {*} service The service to create the payment for.
 * 
 */

export const createPayment = (groupId, service) => {
    return fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.loadToken()}`
        },
        body: JSON.stringify({
            groupId,
            service
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
