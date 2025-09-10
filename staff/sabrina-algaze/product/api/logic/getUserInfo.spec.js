import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getUserInfo } from './getUserInfo.js'
import { User } from '../data/index.js'
import { NotFoundError } from 'com'

describe('getUserInfo', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => User.deleteMany())

    it('gets user info', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        let userId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(user => userId = user.id)
            .then(() => getUserInfo(userId))
            .then(user => {
                expect(user).to.exist

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.username).to.equal(username)
            })
    })

    it('fails on not existing user', () => {
        const userId = '123123123123123123123123'

        let caughtError = null

        return getUserInfo(userId)
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist

                expect(caughtError).to.be.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})