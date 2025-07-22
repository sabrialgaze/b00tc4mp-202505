let usersJSON = '[ {"id": "abc123", "name": "Pepito Grillo", "email": "pepito@grillo.com", "username": "pepitogrillo", "password": "pepito123", "saved": []} ]' // '[ {"id": "123", "name": "Pepito Grillo", ... }, ...]'

let postsJSON = '[ {"id": "12345", "author": "abc123", "image": "test.gif", "text": "hello world", "date": "2025-07-22T13:35:13.428Z", "likes" : [], "archived": false} ]'

export const data = {
    loadUsers() {
        return JSON.parse(usersJSON)
    },

    saveUsers(users) {
        usersJSON = JSON.stringify(users)
    },

    loadPosts() {
        return JSON.parse(postsJSON)
    },

    savePosts(posts) {
        postsJSON = JSON.stringify(posts)
    }

}



