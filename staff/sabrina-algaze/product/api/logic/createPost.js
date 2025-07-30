import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const createPost = (userId, image, text) => {
    validate.userId(userId)
    validate.image(image)
    validate.text(text)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw NotFoundError('user not found')

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