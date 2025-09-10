import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { createPost } from './createPost.js'
import { User, Post } from '../data/index.js'
import { NotFoundError } from 'com'

describe('createPost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('creates a post with an existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        const image = 'https://image.com/123'
        const text = 'hello world'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => createPost(userId, image, text))
            .then(result => expect(result).to.not.exist)
            .then(() => Post.findOne())
            .then(post => {
                expect(post).to.exist

                expect(post.author.toString()).to.equal(userId)
                expect(post.image).to.equal(image)
                expect(post.text).to.equal(text)
            })

    })

    it('fails creating a post with a non-existing user', () => {
        const image = 'https://image.com/123'
        const text = 'hello world'

        const userId = '123123123123123123123123'

        let caughtError = null

        return createPost(userId, image, text)
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
