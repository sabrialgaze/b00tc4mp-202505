import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { createGroup } from './createGroup.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('createPost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('creates a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id
            )
            .then(() => createGroup(coachId, groupName, day, time, location))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.exist
                expect(group.name).to.equal(groupName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(time)
                expect(group.location).to.equal(location)
                expect(group.owner.toString()).to.equal(coachId)
                expect(group.players).to.be.an('array').that.is.empty
            })
    })

    it('fails to create a group with a player role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'player'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let playerId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(player => playerId = player.id)
            .then(() => createGroup(playerId, groupName, day, time, location))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user role is not coach')
            })
    })

    it('fails to create a group with a non-existent user', () => {
        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        const userId = '123123123123123123123123'

        let caughtError = null

        return createGroup(userId, groupName, day, time, location)
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})