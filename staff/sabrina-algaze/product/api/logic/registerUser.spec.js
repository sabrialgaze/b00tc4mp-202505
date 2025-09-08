import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { registerUser } from './registerUser.js'
import { User } from '../data/index.js'
import { DuplicityError } from 'com'

describe('registerUser', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => User.deleteMany())

    it('registers a new user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        return registerUser(name, email, username, password)
            .then(() => User.findOne({ email }))
            .then(user => {
                expect(user).to.exist

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.username).to.equal(username)

                return bcrypt.compare(password, user.password)
                    .then(result => expect(result).to.be.true)
            })
    })

    it('fails on already existing email', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const username = 'pepitogrillo'
        const password = 'pepito123'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, username, password: hash }))
            .then(() => registerUser(name, email, username, password))
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('user already exists')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})