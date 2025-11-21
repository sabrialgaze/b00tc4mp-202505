import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getGroupsForCoach } from './getGroupsForCoach.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('getGroupsForCoach', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it.skip('gets all groups assigned to a specific coach', () => {
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
            .then(user => coachId = user.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => getGroupsForCoach(coachId))
            .then(groups => {
                expect(groups).to.exist.and.be.an.instanceOf(Array)

                const group = groups[0]

                expect(group.id).to.equal(groupId)
                expect(group.name).to.equal(groupName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(time)
                expect(group.location).to.equal(location)
                expect(group.coach.toString()).to.equal(coachId)
                expect(group.owner.toString()).to.equal(coachId)
                expect(group.players).to.exist.and.be.an.instanceOf(Array)
            })
    })

    it('fails to get groups for a player role user', () => {
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
            .then(() => getGroupsForCoach(playerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a coach')
            })
    })

    it('fails to get groups for a coach that has no groups assigned', () => {
        const coachName = 'Pepito Grillo'
        const coachEmail = 'pepito@grillo.com'
        const coachPassword = 'pepito123'
        const coachRole = 'coach'

        const coach2Name = 'Peter Pan'
        const coach2Email = 'peter@pan.com'
        const coach2Password = 'peter123'
        const coach2Role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let coachId = null
        let coach2Id = null
        let groupId = null
        let caughtError = null

        return bcrypt.hash(coachPassword, 10)
            .then(hash => User.create({ name: coachName, email: coachEmail, password: hash, role: coachRole }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(coach2Password, 10)
                .then(hash => User.create({ name: coach2Name, email: coach2Email, password: hash, role: coach2Role }))
                .then(coach2 => coach2Id = coach2.id))
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => getGroupsForCoach(coach2Id))
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