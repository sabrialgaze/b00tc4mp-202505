import { data } from '../data'

export const likePost = (postId) => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw Error('post not found')

    if (!post.likes.includes(userId)) {
        post.likes.push(userId)
    } else {
        post.likes = post.likes.filter(id => id !== userId)
    }

    data.savePosts(posts)
}