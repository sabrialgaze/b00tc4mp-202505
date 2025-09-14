import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { toggleSavePost } from './toggleSavePost.js'
import { User, Post } from '../data/index.js'
import { NotFoundError } from 'com'

describe('toggleSavePost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('toggles saving a post', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        let postId = null
        const image = 'https://image.com/123'
        const text = 'hello world'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => toggleSavePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => User.findOne())
            .then(user => {
                expect(user.saved).to.have.lengthOf(1)
                expect(user.saved[0].toString()).to.equal(postId)
            })
            .then(() => toggleSavePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => User.findOne())
            .then(user => {
                expect(user.saved).to.have.lengthOf(0)
            })

    })

    it('fails to toggle saving a post with non-existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        let postId = null
        const image = 'https://image.com/123'
        const text = 'hello world'

        const failedUserId = '123123123123123132123123'

        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => toggleSavePost(failedUserId, postId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })
    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => disconnect())
})
