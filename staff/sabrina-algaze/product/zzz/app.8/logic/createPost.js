const createPost = (image, text) => {

    if (!image.length) throw new Error('No image was provided')
    if (typeof image !== 'string') throw new TypeError('invalid image type')
    if (!text.length) throw new Error('No text was provided')
    if (typeof text !== 'string') throw new TypeError('invalid text type')

    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')


    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date().toISOString()
    }

    const posts = data.loadPosts()

    posts.push(post)

    data.savePosts(posts)
}