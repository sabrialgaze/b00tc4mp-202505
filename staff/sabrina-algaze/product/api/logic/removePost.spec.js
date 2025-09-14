import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { removePost } from './removePost.js'
import { User, Post } from '../data/index.js'
import { NotFoundError, OwnershipError } from 'com'

describe('removePost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('removes an own post', () => {
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
            .then(() => removePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(result => expect(result).to.not.exist)
    })

    it('fails to remove a post with a non-existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        let postId = null
        const image = 'https://image.com/123'
        const text = 'hello world'

        const failedUserId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => removePost(failedUserId, postId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('fails to remove a non-existing post', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        const failedPostId = '456456456456456456456456'

        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => removePost(userId, failedPostId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('post not found')
            })
    })

    it('fails to remove a not-owned post', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        const notOwnerName = 'James Hook'
        const notOwnerEmail = 'james@hook.com'
        const notOwnerUsername = 'jameshook'
        const notOwnerPassword = 'james123'

        let userId = null
        let notOwnerId = null
        let postId = null

        const image = 'https://image.com/123'
        const text = 'hello world'

        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => bcrypt.hash(notOwnerPassword, 10))
            .then(hash => User.create({ name: notOwnerName, email: notOwnerEmail, username: notOwnerUsername, password: hash }))
            .then(user => notOwnerId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => removePost(notOwnerId, postId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(OwnershipError)
                expect(caughtError.message).to.equal('user not owner of post')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => disconnect())
})

