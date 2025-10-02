import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { updateGroup } from './updateGroup.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('updateGroup', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('updates a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        const newGroupName = 'Jueves'
        const newDay = 'thursday'
        const newTime = '21:00'
        const newLocation = 'Barceloneta'

        let coachId = null
        let groupId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => updateGroup(coachId, groupId, { name: newGroupName, day: newDay, time: newTime, location: newLocation }))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.exist
                expect(group.name).to.equal(newGroupName)
                expect(group.day).to.equal(newDay)
                expect(group.time).to.equal(newTime)
                expect(group.location).to.equal(newLocation)
            })
    })

    it('updates one field of a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        const newTime = '21:00'

        let coachId = null
        let groupId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => updateGroup(coachId, groupId, { time: newTime }))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.exist
                expect(group.name).to.equal(groupName)
                expect(group.day).to.equal(day)
                expect(group.time).to.equal(newTime)
                expect(group.location).to.equal(location)
            })
    })

    it('fails to update a group with a player role user', () => {
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

        const newGroupName = 'Jueves'
        const newDay = 'thursday'
        const newTime = '21:00'
        const newLocation = 'Barceloneta'

        let coachId = null
        let groupId = null
        let playerId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => bcrypt.hash(playerPassword, 10)
                .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole })))
            .then(player => playerId = player.id)
            .then(() => updateGroup(playerId, groupId, { name: newGroupName, day: newDay, time: newTime, location: newLocation }))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user role is not coach')
            })
    })

    it('fails to update a group with a non-existent user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        const newGroupName = 'Jueves'
        const newDay = 'thursday'
        const newTime = '21:00'
        const newLocation = 'Barceloneta'

        let coachId = null
        let groupId = null
        const failedUserId = '123123123123123123123123'
        let caughtError = null


        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId }))
            .then(group => groupId = group.id)
            .then(() => updateGroup(failedUserId, groupId, { name: newGroupName, day: newDay, time: newTime, location: newLocation }))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(NotFoundError)
                expect(caughtError.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})