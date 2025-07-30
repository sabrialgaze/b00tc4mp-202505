import { data } from '../data'
import { errors } from 'com'

export const createPost = (image, text) => {
    if (typeof image !== 'string') throw new TypeError('invalid image type')
    if (!image.length) throw new Error('No image was provided')
    if (typeof text !== 'string') throw new TypeError('invalid text type')
    if (!text.length) throw new Error('No text was provided')

    return fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${data.loadUserId()}`
        },
        body: JSON.stringify({
            image,
            text
        })
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 201) return

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}