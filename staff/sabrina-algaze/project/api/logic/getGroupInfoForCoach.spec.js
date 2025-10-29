import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getGroupInfoForCoach } from './getGroupInfoForCoach.js'
import { User, Group } from '../data/index.js'
import { RoleError } from 'com'

describe('getGroupInfoForCoach', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('gets the players of a group with a coach role user', () => {
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

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => getGroupInfoForCoach(coachId, groupId))
            .then(group => {
                expect(group).to.exist
                expect(group).to.be.an.instanceOf(Object)
                expect(group.players.length).to.equal(1)
                expect(group.players[0].name).to.equal(playerName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(time)
                expect(group.location).to.equal(location)
            })
    })
    it('fails to get the players of a group with a player role user', () => {
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
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(player => playerId = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => getGroupInfoForCoach(playerId, groupId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a coach')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})