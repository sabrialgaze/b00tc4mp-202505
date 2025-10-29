import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getTrainingsForPlayer } from './getTrainingsForPlayer.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError, RoleError } from 'com'
import { calculateNextTrainingDate } from './helpers/calculateNextTrainingDate.js'
import { getDayOfWeekNumber } from './helpers/getDayOfWeekNumber.js'

describe('getTrainingsForPlayer', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('gets the future trainings for a player', () => {
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

        let trainingDate = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group._id)
            .then(() => {
                trainingDate = calculateNextTrainingDate(getDayOfWeekNumber(day))
                trainingDate.setHours(trainingDate.getHours() + 1)
            })
            .then(() => Training.create({ group: groupId, date: trainingDate, coach: coachId }))
            .then(() => getTrainingsForPlayer(playerId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(1)
                expect(trainings[0].date.toString()).to.equal(trainingDate.toString())
                expect(trainings[0].coach.toString()).to.equal(coachId)
                expect(trainings[0].joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].invited).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].status).to.equal('confirmed')
            })
    })

    it('gets the past trainings for a player', () => {
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

        let trainingDate = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => {
                trainingDate = new Date()
                trainingDate.setDate(trainingDate.getDate() - 1)
            })
            .then(() => Training.create({ group: groupId, date: trainingDate, coach: coachId, joined: [playerId] }))
            .then(() => getTrainingsForPlayer(playerId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(1)
                expect(trainings[0].date.toString()).to.equal(trainingDate.toString())
                expect(trainings[0].coach.toString()).to.equal(coachId)
                expect(trainings[0].joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].joined[0].toString()).to.equal(playerId)
                expect(trainings[0].invited).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].status).to.equal('confirmed')
            })
    })

    it('gets the past not joined trainings for a player', () => {
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

        let trainingDate = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => {
                trainingDate = new Date()
                trainingDate.setDate(trainingDate.getDate() - 1)
            })
            .then(() => Training.create({ group: groupId, date: trainingDate, coach: coachId }))
            .then(() => getTrainingsForPlayer(playerId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(1)
                expect(trainings[0].joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].joined.length).to.equal(0)
            })
    })

    it('fails to get the trainings with a non-existent user', () => {
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
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(() => getTrainingsForPlayer(failedPlayerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('fails to get the trainings with a coach role user', () => {
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
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(), coach: coachId }))
            .then(() => getTrainingsForPlayer(coachId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a player')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    after(() => disconnect())
})