import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { createGroup } from './createGroup.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('createGroup', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('creates a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const coachName = 'Peter Pan'
        const coachEmail = 'peter@pan.com'
        const coachPassword = 'peter123'
        const coachRole = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let ownerId = null
        let coachId = null


        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(owner => ownerId = owner.id)
            .then(() => bcrypt.hash(coachPassword, 10)
                .then(hash => User.create({ name: coachName, email: coachEmail, password: hash, role: coachRole }))
                .then(coach => coachId = coach.id))
            .then(() => createGroup(ownerId, groupName, day, time, location, coachEmail))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.exist
                expect(group.name).to.equal(groupName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(time)
                expect(group.location).to.equal(location)
                expect(group.owner.toString()).to.equal(ownerId)
                expect(group.players).to.be.an('array').that.is.empty
                expect(group.coach.toString()).to.equal(coachId)
            })
    })

    it('fails to create a group with a player role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'player'

        const coachName = 'Peter Pan'
        const coachEmail = 'peter@pan.com'
        const coachPassword = 'peter123'
        const coachRole = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let playerId = null
        let coachId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(player => playerId = player.id)
            .then(() => bcrypt.hash(coachPassword, 10)
                .then(hash => User.create({ name: coachName, email: coachEmail, password: hash, role: coachRole }))
                .then(coach => coachId = coach.id))
            .then(() => createGroup(playerId, groupName, day, time, location, coachEmail))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user role is not coach')
            })
    })

    it('fails to create a group with a non-existent user', () => {
        const coachName = 'Peter Pan'
        const coachEmail = 'peter@pan.com'
        const coachPassword = 'peter123'
        const coachRole = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null
        const userId = '123123123123123123123123'

        let caughtError = null

        return bcrypt.hash(coachPassword, 10)
            .then(hash => User.create({ name: coachName, email: coachEmail, password: hash, role: coachRole })
                .then(coach => coachId = coach.id))
            .then(() => createGroup(userId, groupName, day, time, location, coachEmail))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('fails to create a group with a non-existent coach', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        const coachEmail = 'failed@coach.com'
        let ownerId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(owner => ownerId = owner.id)
            .then(() => createGroup(ownerId, groupName, day, time, location, coachEmail))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('coach not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})