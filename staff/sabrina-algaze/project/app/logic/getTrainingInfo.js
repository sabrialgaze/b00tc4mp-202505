import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Gets the training info.
 * @example
 ```js
// demo

getTrainingInfo('68e121bb9ff0d34e5a09f1d1')
    .then(training => console.log(training))
    .catch(error => console.error(error))
 ```
 *   
 * @param {string} trainingId   The training id.   
 */

export const getTrainingInfo = trainingId => {
    validate.trainingId(trainingId)

    return fetch(`${import.meta.env.VITE_API_URL}/trainings/${trainingId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.loadToken()}`
        }
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}