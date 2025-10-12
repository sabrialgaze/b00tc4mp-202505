import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Toggles join training.
 * @example
 ```js
// demo

toggleJoinTraining('68e121bb9ff0d34e5a09f1d1')
    .then(() => console.log('Training joined'))
    .catch(error => console.error(error))
 ```
 * @param {string} trainingId The training id.
 */

export const toggleJoinTraining = trainingId => {
    validate.trainingId(trainingId)

    return fetch(`${import.meta.env.VITE_API_URL}/trainings/${trainingId}/join`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${data.loadToken()}`
        }
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