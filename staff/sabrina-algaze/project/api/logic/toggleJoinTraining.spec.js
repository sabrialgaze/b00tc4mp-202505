import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { toggleJoinTraining } from './toggleJoinTraining.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError, RoleError } from 'com'

describe('toggleJoinTraining', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('it toggles the join status of a training for a player', () => {
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
        let groupId = null
        let playerId = null
        let trainingId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 9, 8, 20, 0, 0, 0), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(trainingId, playerId))
            .then(result => expect(result).to.not.exist)
            .then(() => Training.findOne())
            .then(training => {
                expect(training).to.exist
                expect(training.joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(training.joined.length).to.equal(1)
                expect(training.joined[0].toString()).to.equal(playerId)
            })
    })

    it('it fails to toggle the join status for a non-existent training', () => {
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
        let groupId = null
        let playerId = null
        const failedTrainingId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => toggleJoinTraining(failedTrainingId, playerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('training not found')
            })
    })

    it('it fails to toggle the join status of a training for a coach role user', () => {
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
        let groupId = null
        let playerId = null
        let trainingId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 9, 8, 20, 0, 0, 0), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(trainingId, coachId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a player')
            })
    })

    it('it fails to toggle the join status of a training for a non-existent player', () => {
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
        let groupId = null
        let playerId = null
        const failedPlayerId = '123123123123123123123123'
        let trainingId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 9, 8, 20, 0, 0, 0), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(trainingId, failedPlayerId))
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
