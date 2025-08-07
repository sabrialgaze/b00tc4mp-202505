import { validate, NotFoundError, SystemError } from 'com'
import { User, Post } from '../data/models.js'

export const getPosts = (userId) => {
    validate.userId(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find({ archived: false }, '-__v').populate('author', 'username').sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(posts => {
                    return posts.map(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        post.own = post.author.id === userId

                        post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)

                        post.likesCount = post.likes.length

                        delete post.likes

                        post.saved = user.saved.some(postObjectId => postObjectId.toString() === post.id)

                        return post
                    })
                })
        })
}