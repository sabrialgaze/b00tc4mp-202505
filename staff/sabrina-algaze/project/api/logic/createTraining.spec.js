import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { createTraining } from './createTraining.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError, RoleError } from 'com'

describe('createTraining', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('creates a training for a group', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null
        let groupId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => createTraining(coachId, groupId))
            .then(result => expect(result).to.not.exist)
            .then(() => Training.findOne())
            .then(training => {
                expect(training).to.exist
                expect(training.group.toString()).to.equal(groupId)
                expect(training.date).to.exist.and.be.an.instanceOf(Date)
                expect(training.joined).to.exist.and.be.an.instanceOf(Array)
                expect(training.invited).to.exist.and.be.an.instanceOf(Array)
            })
    })

    it('fails to create a training with a player role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const playerName = 'Peter Pan'
        const playerEmail = 'peter@pan.com'
        const playerPassword = 'peter123'
        const playerRole = 'player'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null
        let playerUserId = null
        let groupId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10)
                .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
                .then(player => playerUserId = player.id))
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location }))
            .then(group => groupId = group.id)
            .then(() => createTraining(playerUserId, groupId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user role is not coach')
            })
    })

    it('fails to create a training for a non-existent group', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        let coachId = null
        const groupId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => createTraining(coachId, groupId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('group not found')
            })
    })

    it('fails to create a training with a non-existent user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null
        let groupId = null
        const failedCoachId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location }))
            .then(group => groupId = group.id)
            .then(() => createTraining(failedCoachId, groupId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    after(() => disconnect())
})