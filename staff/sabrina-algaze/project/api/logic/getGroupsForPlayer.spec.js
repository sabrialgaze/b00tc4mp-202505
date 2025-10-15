import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getGroupsForPlayer } from './getGroupsForPlayer.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('getGroupsForPlayer', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('gets all groups a player is part of', () => {
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

        const groupName2 = 'Jueves'
        const day2 = 'thursday'
        const time2 = '20:00'
        const location2 = 'Barceloneta'

        let coachId = null
        let playerId = null
        let groupId1 = null
        let groupId2 = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => coachId = user.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(user => playerId = user.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId1 = group.id)
            .then(() => Group.create({ owner: coachId, name: groupName2, day: day2, time: time2, location: location2, coach: coachId, players: [playerId] }))
            .then(group => groupId2 = group.id)
            .then(() => getGroupsForPlayer(playerId))
            .then(groups => {
                expect(groups).to.exist.and.be.an.instanceOf(Array)

                const group = groups[0]

                expect(group.id).to.equal(groupId1)
                expect(group.name).to.equal(groupName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(time)
                expect(group.location).to.equal(location)
                expect(group.coach.toString()).to.equal(coachId)
                expect(group.owner.toString()).to.equal(coachId)
                expect(group.players).to.exist.and.be.an.instanceOf(Array)
                expect(group.players.length).to.equal(1)
                expect(group.players[0].toString()).to.equal(playerId)

                const group2 = groups[1]

                expect(group2.id).to.equal(groupId2)
                expect(group2.name).to.equal(groupName2)
                expect(group2.day).to.equal(day2)
                expect(group2.time).to.equal(time2)
                expect(group2.location).to.equal(location2)
                expect(group2.coach.toString()).to.equal(coachId)
                expect(group2.owner.toString()).to.equal(coachId)
                expect(group2.players).to.exist.and.be.an.instanceOf(Array)
                expect(group2.players.length).to.equal(1)
                expect(group2.players[0].toString()).to.equal(playerId)
            })
    })

    it('fails to get groups for a coach role user', () => {
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
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10)
                .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
                .then(player => playerId = player.id))
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => getGroupsForPlayer(coachId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a player')
            })
    })

    it('fails to get groups for a player that is not part of any group', () => {
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
        let caughtError = null


        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10)
                .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
                .then(player => playerId = player.id))
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => getGroupsForPlayer(playerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('groups not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})
