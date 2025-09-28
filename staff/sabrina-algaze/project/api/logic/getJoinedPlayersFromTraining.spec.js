import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getJoinedPlayersFromTraining } from './getJoinedPlayersFromTraining.js'
import { User, Group, Training } from '../data/index.js'
import { NotFoundError, RoleError } from 'com'

describe('getJoinedPlayersFromTraining', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    it('it gets the joined players from a training', () => {
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
            .then(() => Training.create({ group: groupId, date: new Date(2025, 9, 8, 20, 0, 0, 0), joined: [playerId], coach: coachId }))
            .then(training => trainingId = training.id)
            .then(() => getJoinedPlayersFromTraining(trainingId))
            .then(players => {
                expect(players).to.exist
                expect(players).to.be.an.instanceOf(Array)
                expect(players.length).to.equal(1)
                expect(players[0].id).to.equal(playerId)
                expect(players[0].name).to.equal(playerName)
            })
    })

    it('it fails to get the joined players from a non-existent training', () => {
        const failedTrainingId = '123123123123123123123123'
        let caughtError = null

        return getJoinedPlayersFromTraining(failedTrainingId)
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('training not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Training.deleteMany()]))

    after(() => disconnect())
})  