import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getPosts } from './getPosts.js'
import { User, Post } from '../data/index.js'
import { NotFoundError } from 'com'

describe('getPosts', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('gets all posts as an existing user', () => {
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
            .then(() => getPosts(userId))
            .then(posts => {
                expect(posts).to.exist
                expect(posts).to.be.an('array')

                const post = posts[0]

                expect(post.id).to.equal(postId)
                expect(post.own).to.be.true
                expect(post.liked).to.be.false
                expect(post.likesCount).to.equal(0)
                expect(post.saved).to.be.false
            })
    })

    it('fails to get posts with non-existing user', () => {
        const userId = '123123123123123132123123'

        let caughtError = null

        return getPosts(userId)
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