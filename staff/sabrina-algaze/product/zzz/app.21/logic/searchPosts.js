import { data } from '../data'
import { validate, errors, SystemError } from 'com'

/**
 * Searches posts. 
 * 
 * @example
 ```js
 // demo

searchPosts('happy')
     .then(posts => console.log(posts))
     .catch(error => console.error(error))
 ```
 */

export const searchPosts = query => {
    validate.query(query)

    return fetch(`${import.meta.env.VITE_API_URL}/posts?q=${query}`, {
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
                    .then(posts => posts)
            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        })
}
