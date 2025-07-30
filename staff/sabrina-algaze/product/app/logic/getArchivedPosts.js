import { data } from '../data'
import { errors } from 'com'

export const getArchivedPosts = () => {
    return fetch('http://localhost:8080/posts/archived', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${data.loadUserId()}`
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

                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}