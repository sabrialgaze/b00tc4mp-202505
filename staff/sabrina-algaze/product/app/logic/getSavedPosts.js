import { data } from '../data'

export const getSavedPosts = () => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const savedPosts = posts.filter(post => user.saved.includes(post.id))

    savedPosts.forEach(post => {
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

    return savedPosts
}
