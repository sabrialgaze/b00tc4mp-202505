import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { toggleArchivePost } from './toggleArchivePost.js'
import { User, Post } from '../data/index.js'
import { NotFoundError, OwnershipError } from 'com'

describe('toggleArchivePost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('toggles archiving a post', () => {
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
            .then(() => toggleArchivePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(post => {
                expect(post.archived).to.be.true
            })
            .then(() => toggleArchivePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(post => {
                expect(post.archived).to.be.false
            })
    })

    it('fails to toggle archiving a post with non-existing user', () => {
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
            .then(() => toggleArchivePost(failedUserId, postId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('fails to toggle archiving a non-existing post', () => {
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
            .then(() => toggleArchivePost(userId, failedPostId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('post not found')
            })
    })

    it('fails to toggle archiving a not-owned post', () => {
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
            .then(() => toggleArchivePost(notOwnerId, postId))
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
