import { data } from '../data/index.js'

export const createPost = (image, text, userId) => {
    if (typeof image !== 'string') throw new TypeError('invalid image type')
    if (!image.length) throw new Error('No image was provided')
    if (typeof text !== 'string') throw new TypeError('invalid text type')
    if (!text.length) throw new Error('No text was provided')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date().toISOString(),
        likes: [],
        archived: false
    }

    const posts = data.loadPosts()

    posts.push(post)

    data.savePosts(posts)
}