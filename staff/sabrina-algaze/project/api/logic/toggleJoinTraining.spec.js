import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { toggleJoinTraining } from './toggleJoinTraining.js'
import { User, Group, Training, Payment } from '../data/index.js'
import { NotFoundError, RoleError, ValidationError } from 'com'

describe('toggleJoinTraining', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('joins a training for a player', () => {
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

        const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        let coachId = null
        let groupId = null
        let playerId = null
        let trainingId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: futureDate, coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'month', trainingDate: futureDate }))
            .then(() => toggleJoinTraining(playerId, trainingId))
            .then(result => expect(result).to.not.exist)
            .then(() => Training.findOne())
            .then(training => {
                expect(training).to.exist
                expect(training.joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(training.joined.length).to.equal(1)
                expect(training.joined[0].toString()).to.equal(playerId)
            })
    })

    it('unjoins a training for a player', () => {
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

        const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        let coachId = null
        let groupId = null
        let playerId = null
        let trainingId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: futureDate, coach: coachId, joined: [playerId] }))
            .then(training => trainingId = training.id)
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'month', trainingDate: futureDate }))
            .then(() => toggleJoinTraining(playerId, trainingId))
            .then(result => expect(result).to.not.exist)
            .then(() => Training.findOne())
            .then(training => {
                expect(training).to.exist
                expect(training.joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(training.joined.length).to.equal(0)
            })
    })

    it('fails to toggle the join status for a past training', () => {
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

        const pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

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
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: pastDate, coach: coachId, joined: [playerId] }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(playerId, trainingId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(ValidationError)
                expect(caughtError.message).to.equal('cannot join/unjoin past training')
            })
    })


    it('fails to toggle the join status for a non-existent training', () => {
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
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => toggleJoinTraining(playerId, failedTrainingId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('training not found')
            })
    })

    it('fails to toggle the join status of a training for a coach role user', () => {
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
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(coachId, trainingId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a player')
            })
    })

    it('fails to toggle the join status of a training for a non-existent player', () => {
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
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => toggleJoinTraining(failedPlayerId, trainingId))
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
