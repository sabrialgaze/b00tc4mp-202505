import { validate, NotFoundError, SystemError } from 'com'
import { User, Post } from '../data/index.js'

export const createPost = (userId, image, text) => {
    validate.userId(userId)
    validate.image(image)
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({
                author: userId,
                image,
                text
            })
                .catch(error => { throw new SystemError('mongo error') })
                .then(post => { })
        })

}