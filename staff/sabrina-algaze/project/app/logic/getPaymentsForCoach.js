import { data } from '../data'
import { errors, SystemError } from 'com'

/**
 * Gets the payments for the current coach.
 * @example
 ```js
 // demo

getPaymentsForCoach()  
     .then(payments => console.log(payments))
     .catch(error => console.error(error))
```
 */

export const getPaymentsForCoach = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/payments/coach`, {
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

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}