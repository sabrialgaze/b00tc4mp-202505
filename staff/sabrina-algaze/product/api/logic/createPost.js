import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const createPost = (userId, image, text) => {
    validate.userId(userId)
    validate.image(image)
    validate.text(text)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.id === userId)

            if (!user) throw new NotFoundError('user not found')

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

            return data.loadPosts()
                .then(posts => {
                    posts.push(post)

                    return data.savePosts(posts)
                })
        })
}