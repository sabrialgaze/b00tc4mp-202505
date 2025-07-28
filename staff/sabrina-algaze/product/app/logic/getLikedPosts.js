import { data } from '../data'

export const getLikedPosts = () => {
    return fetch('http://localhost:8080/posts/liked', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${data.loadUserId()}`
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

                    throw new Error(message)
                })
        })
}