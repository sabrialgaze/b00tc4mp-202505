import { data } from '../data'
import { errors, SystemError } from 'com'

export const toggleLikePost = postId => {
    if (typeof postId !== 'string') throw new TypeError('invalid postId type')

    return fetch(`http://localhost:8080/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${data.loadToken()}`
        },
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 204) return

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError

                    throw new constructor(message)
                })
        })
}