import { data } from '../data'

export const toggleArchivePost = postId => {
    if (typeof postId !== 'string') throw new TypeError('invalid postId type')

    return fetch(`http://localhost:8080/posts/${postId}/archived`, {
        method: 'PATCH',
        headers: {
            Authorization: `Basic ${data.loadUserId()}`
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

                    throw new Error(message)
                })
        })
}