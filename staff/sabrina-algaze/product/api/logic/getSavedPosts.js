import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const getSavedPosts = userId => {
    validate.userId(userId)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.id === userId)

            if (!user) throw new NotFoundError('user not found')

            return data.loadPosts()
                .then(posts => {
                    posts = posts.filter(post => user.saved.includes(post.id) && !post.archived)

                    posts.forEach(post => {
                        const author = users.find(user => user.id === post.author)

                        if (!author) throw new NotFoundError('author not found')

                        const { id, username } = author

                        // populate author
                        post.author = { id, username }

                        post.own = post.author.id === userId

                        post.liked = post.likes.includes(userId)

                        post.likesCount = post.likes.length

                        delete post.likes

                        post.saved = true
                    })
                    return posts
                })
        })
}
