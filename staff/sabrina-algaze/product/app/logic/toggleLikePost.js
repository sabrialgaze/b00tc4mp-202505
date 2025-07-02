import { data } from '../data'

export const toggleLikePost = postId => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw Error('post not found')

    const { likes } = post

    const index = likes.findIndex(likeUserId => likeUserId === userId)

    if (index < 0) likes.push(userId)

    else likes.splice(index, 1)

    data.savePosts(posts)
}