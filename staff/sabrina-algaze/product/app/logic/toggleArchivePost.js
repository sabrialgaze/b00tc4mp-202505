import { data } from '../data'

export const toggleArchivePost = postId => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw Error('post not found')

    const { archived } = user

    const index = archived.findIndex(archivedPostId => archivedPostId === postId)

    if (index < 0) archived.push(postId)

    else archived.splice(index, 1)

    data.saveUsers(users)
}