import { data } from '.';

// const posts = data.loadPosts()

// posts.forEach(post => post.likes = [])

// data.savePosts(posts)

const users = data.loadUsers()

users.forEach(user => user.saved = [])

data.saveUsers(users)