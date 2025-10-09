import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Gets the joined players from a training.
 * @example
    ```js
// demo

getJoinedPlayersFromTraining('68df91556d15402089312e9f')
    .then(players => console.log(players))
    .catch(error => console.error(error))
```

 * @param {string} trainingId The training id.
 */

export const getJoinedPlayersFromTraining = (trainingId) => {
    validate.trainingId(trainingId)

    return fetch(`${import.meta.env.VITE_API_URL}/trainings/${trainingId}/players`, {
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
                    .then(players => players)
            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}