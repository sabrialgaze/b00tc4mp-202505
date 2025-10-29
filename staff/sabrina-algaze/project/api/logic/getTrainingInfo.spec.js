import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getTrainingInfo } from './getTrainingInfo.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError } from 'com'

describe('getTrainingInfo', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('gets a training info for a coach role user', () => {
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
        let trainingId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => getTrainingInfo(coachId, trainingId))
            .then(training => {
                expect(training).to.exist
                expect(training.coach.toString()).to.equal(coachId)
                expect(training.date).to.exist
                expect(training.date).to.be.an.instanceof(Date)
                expect(training.group).to.exist
                expect(training.group._id.toString()).to.equal(groupId)
                expect(training.group.name).to.equal(groupName)
                expect(training.group.location).to.equal(location)
                expect(training.group.playersCount).to.equal(0)
            })
    })

    it('gets a training info for a player role user', () => {
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
        let playerId = null
        let groupId = null
        let trainingId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => getTrainingInfo(playerId, trainingId))
            .then(training => {
                expect(training).to.exist
                expect(training.coach.toString()).to.equal(coachId)
                expect(training.date).to.exist
                expect(training.date).to.be.an.instanceof(Date)
                expect(training.group).to.exist
                expect(training.group._id.toString()).to.equal(groupId)
                expect(training.group.name).to.equal(groupName)
                expect(training.group.location).to.equal(location)
                expect(training.group.playersCount).to.equal(1)
            })
    })

    it('fails to get a training info for a non-existent user', () => {
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
        let trainingId = null
        const failedUserId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => getTrainingInfo(failedUserId, trainingId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceof(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('fails to get a training info with a non-existent id', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        let coachId = null
        const failedTrainingId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => getTrainingInfo(coachId, failedTrainingId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceof(NotFoundError)
                expect(caughtError.message).to.equal('training not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    after(() => disconnect())
})