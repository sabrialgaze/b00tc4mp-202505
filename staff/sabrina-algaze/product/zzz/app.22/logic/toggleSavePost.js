import { data } from '../data'
import { errors, SystemError } from 'com'

export const toggleSavePost = postId => {
    if (typeof postId !== 'string') throw new TypeError('invalid postId type')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/saved`, {
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