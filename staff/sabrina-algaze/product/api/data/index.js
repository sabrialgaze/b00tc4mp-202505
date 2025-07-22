let usersJSON = '[ {"id": "abc123", "name": "Pepito Grillo", "email": "pepito@grillo.com", "username": "pepitogrillo", "password": "pepito123"} ]' // '[ {"id": "123", "name": "Pepito Grillo", ... }, ...]'

let postsJSON = '[]'

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



