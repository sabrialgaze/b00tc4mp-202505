import { data } from '../data/index.js'

export const getLikedPosts = userId => {
    if (typeof userId !== 'string') throw new TypeError('invalid userId type')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    let posts = data.loadPosts()

    posts = posts.filter(post => post.likes.includes(user.id) && !post.archived)

    posts.forEach(post => {
        const author = users.find(user => user.id === post.author)

        if (!author) throw Error('author not found')

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
}
