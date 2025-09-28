import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getPastTrainingsForPlayer } from './getPastTrainingsForPlayer.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError, RoleError } from 'com'

describe('getPastTrainingsForPlayer', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('it gets the past trainings for a player', () => {
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

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 8, 10, 20, 0, 0, 0), joined: [playerId], coach: coachId }))
            .then(() => getPastTrainingsForPlayer(playerId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(1)
                expect(trainings[0].group.toString()).to.equal(groupId)
                expect(trainings[0].date.toString()).to.equal(new Date(2025, 8, 10, 20, 0, 0, 0).toString())
                expect(trainings[0].coach.toString()).to.equal(coachId)
                expect(trainings[0].joined).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].joined.length).to.equal(1)
                expect(trainings[0].joined[0].toString()).to.equal(playerId)
                expect(trainings[0].invited).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings[0].status).to.equal('confirmed')
            })
    })

    it('it fails to get the past trainings with a non-existent user', () => {
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
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 8, 10, 20, 0, 0, 0), joined: [playerId], coach: coachId }))
            .then(() => getPastTrainingsForPlayer(failedPlayerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    it('it fails to get the past trainings with a coach role user', () => {
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
            .then(() => User.create({ name: playerName, email: playerEmail, password: playerPassword, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, players: [playerId], day, time, location }))
            .then(group => groupId = group.id)
            .then(() => Training.create({ group: groupId, date: new Date(2025, 8, 10, 20, 0, 0, 0), joined: [playerId], coach: coachId }))
            .then(() => getPastTrainingsForPlayer(coachId))
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