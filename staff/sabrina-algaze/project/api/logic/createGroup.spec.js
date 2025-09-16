import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { createGroup } from './createGroup.js'
import { User, Group } from '../data/index.js'
import { RolePermissionError, NotFoundError } from 'com'

describe('createPost', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('creates a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        let userId = null

        const groupName = 'Grupo Miercoles'
        const dayOfWeek = 'wednesday'
        const time = '20:00'
        const coachId = '123123123123123123123123'

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => userId = user.id)
            .then(() => createGroup(userId, groupName, dayOfWeek, time, coachId))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.exist
                expect(group.name).to.equal(groupName)
                expect(group.schedule).to.exist
                expect(group.schedule.dayOfWeek).to.equal(dayOfWeek)
                expect(group.schedule.time).to.equal(time)
                expect(group.coach.toString()).to.equal(coachId)
                expect(group.players).to.be.an('array').that.is.empty
            })
    })

    it('fails to create a group with a player role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'player'

        let userId = null

        const groupName = 'Grupo Miercoles'
        const dayOfWeek = 'wednesday'
        const time = '20:00'
        const coach = 'Juan Perez'

        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => userId = user.id)
            .then(() => createGroup(userId, groupName, dayOfWeek, time, coach))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RolePermissionError)
                expect(caughtError.message).to.equal('user does not have permission to create a group')
            })
    })

    it('fails to create a group with a non-existent user', () => {
        const groupName = 'Grupo Miercoles'
        const dayOfWeek = 'wednesday'
        const time = '20:00'
        const coach = 'Juan Perez'

        const userId = '123123123123123123123123'

        let caughtError = null

        return createGroup(userId, groupName, dayOfWeek, time, coach)
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