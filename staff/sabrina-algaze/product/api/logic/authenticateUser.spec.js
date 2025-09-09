import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { authenticateUser } from './authenticateUser.js'
import { User } from '../data/index.js'
import { NotFoundError, CredentialsError } from 'com'

describe('authenticateUser', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => User.deleteMany())

    it('authenticates an existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        return bcrypt.hash(password, 10)
            .then(hash => {
                return User.create({ name, email, username, password: hash })
            })
            .then(() => {
                return authenticateUser(username, password)
            })
            .then(({ id }) => {
                return User.findOne({ username })
                    .then(user => {
                        expect(user).to.exist

                        expect(user._id.toString()).to.equal(id)
                    })
            })
    })

    it('fails on not existing user', () => {
        const username = 'pepitogrillo'
        const password = 'pepito123'

        return authenticateUser(username, password)
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on wrong password', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(() => authenticateUser(username, 'pepito1'))
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})
