import { validate, NotFoundError, SystemError } from 'com'
import { User, Post } from '../data/index.js'

export const toggleSavePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    // return User.findById(userId)
    //     .catch(error => { throw new SystemError('mongo error') })
    //     .then(user => {
    //         if (!user) throw new NotFoundError('user not found')

    //         return Post.findById(postId)
    //             .catch(error => { throw new SystemError('mongo error') })
    //             .then(post => {
    //                 if (!post) throw new NotFoundError('post not found')

    //                 const { saved } = user

    //                 const index = saved.findIndex(savedPostId => savedPostId.toString() === postId)

    //                 if (index < 0) saved.push(postId)

    //                 else saved.splice(index, 1)

    //                 return user.save()
    //             })
    //     })

    return User.updateOne(
        { _id: userId },
        { $addToSet: { saved: postId } }
    )
        .catch(error => { throw new SystemError('mongo error') })
        .then(result => {
            if (result.matchedCount === 0) throw new NotFoundError('user not found')

            if (result.modifiedCount === 0) {
                return User.updateOne(
                    { _id: userId, saved: postId },
                    { $pull: { saved: postId } }
                )
                    .catch(error => { throw new SystemError('mongo error') })
                    .then(() => { })
            }
        })
}