import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { searchPosts } from './searchPosts.js'
import { User, Post } from '../data/index.js'
import { NotFoundError } from 'com'

describe('searchPosts', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('searches posts with an existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        let postId = null

        const image = 'https://image.com/123'
        const text = 'hello world'

        const query = 'hello'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => searchPosts(userId, query))
            .then(posts => {
                expect(posts).to.exist
                expect(posts).to.be.instanceOf(Array)
                expect(posts).to.have.lengthOf(1)

                const post = posts[0]

                expect(post.text).to.include(query)
            })
    })

    it('searches posts with an existing user, but not matching results', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null
        let postId = null

        const image = 'https://image.com/123'
        const text = 'hello world'

        const query = 'hola'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => Post.create({ author: userId, image, text }))
            .then(post => postId = post.id)
            .then(() => searchPosts(userId, query))
            .then(posts => {
                expect(posts).to.exist
                expect(posts).to.be.instanceOf(Array)
                expect(posts).to.have.lengthOf(0)
            })
    })

    it('fails to search posts with a non-existing user', () => {
        const userId = '123123123123123132123123'
        const query = 'hello'

        let caughtError = null

        return searchPosts(userId, query)
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