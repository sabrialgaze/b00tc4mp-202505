import { readFile, writeFile } from 'fs/promises'
import { SystemError } from 'com'

export const data = {
    loadUsers() {
        return readFile('./data/users.json', 'utf8')
            .catch(error => { throw new SystemError('file read error') })
            .then(json => JSON.parse(json))
            .catch(error => { throw new SystemError('json parse error') })
    },

    saveUsers(users) {
        return writeFile('./data/users.json', JSON.stringify(users))
            .catch(error => { throw new SystemError('file write error') })
            .then(() => { })
    },

    loadPosts() {
        return JSON.parse(postsJSON)
    },

    savePosts(posts) {
        postsJSON = JSON.stringify(posts)
    }

}



