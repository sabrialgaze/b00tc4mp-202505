import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { toggleLikePost } from './toggleLikePost.js'
import { User, Post } from '../data/index.js'
import { NotFoundError } from 'com'

describe('toggleLikePost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('toggles a like on a post', () => {
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
            .then(() => toggleLikePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(post => {
                expect(post.likes).to.have.lengthOf(1)
                expect(post.likes[0].toString()).to.equal(userId)
            })
            .then(() => toggleLikePost(userId, postId))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(post => {
                expect(post.likes).to.have.lengthOf(0)
            })
    })

    it('fails to toggle liking a post with non-existing user', () => {
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
            .then(() => toggleLikePost(failedUserId, postId))
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
