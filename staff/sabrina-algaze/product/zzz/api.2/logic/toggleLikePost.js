import { validate, NotFoundError } from 'com'
import { User, Post } from '../data/models.js'


export const toggleLikePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // return Post.findById(postId)
            //     .catch(error => { throw new SystemError('mongo error') })
            //     .then(post => {
            //         if (!post) throw new NotFoundError('post not found')

            //         const { likes } = post

            //         const index = likes.findIndex(likeUserId => likeUserId.toString() === userId)

            //         if (index < 0) likes.push(userId)

            //         else likes.splice(index, 1)

            //         return post.save()
            //             .catch(error => { throw new SystemError('mongo error') })
            //     })
            //     .then(() => { })

            return Post.updateOne(
                { _id: postId },
                { $addToSet: { likes: userId } }
            )
                .catch(error => { throw new SystemError('mongo error') })
                .then(result => {
                    if (result.matchedCount === 0) { throw new NotFoundError('post not found') }

                    if (result.modifiedCount === 0) {
                        return Post.updateOne(
                            { _id: postId, likes: userId },
                            { $pull: { likes: userId } }
                        )
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(() => { })
                    }
                })
        })
}

