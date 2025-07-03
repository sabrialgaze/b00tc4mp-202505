import { data } from '.';

// Add likes property to posts

// const posts = data.loadPosts()

// posts.forEach(post => post.likes = [])

// data.savePosts(posts)

// Add saved property to users

// const users = data.loadUsers()

// users.forEach(user => user.saved = [])

// data.saveUsers(users)

// Add archived property to users

const users = data.loadUsers()

users.forEach(user => user.archived = [])

data.saveUsers(users)
