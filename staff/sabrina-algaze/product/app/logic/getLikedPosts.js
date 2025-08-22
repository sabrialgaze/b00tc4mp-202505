import { data } from '../data'
import { errors, SystemError } from 'com'

export const getLikedPosts = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/liked`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.loadToken()}`
        }
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status == 200)
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