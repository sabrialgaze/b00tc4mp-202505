import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { deleteGroup } from './deleteGroup.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('deleteGroup', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('deletes a group with a coach role user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let userId = null
        let groupId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => userId = user.id)
            .then(() => Group.create({ owner: userId, name: groupName, day, time, location }))
            .then(group => groupId = group.id)
            .then(() => deleteGroup(userId, groupId))
            .then(result => expect(result).to.not.exist)
            .then(() => Group.findOne())
            .then(group => {
                expect(group).to.not.exist
            })
    })

    it('fails to delete a group with a player role user', () => {
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

        let userId = null
        let groupId = null
        let playerId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => userId = user.id)
            .then(() => Group.create({ owner: userId, name: groupName, day, time, location }))
            .then(group => groupId = group.id)
            .then(() => bcrypt.hash(playerPassword, 10)
                .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole })))
            .then(player => playerId = player.id)
            .then(() => deleteGroup(playerId, groupId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user role is not coach')
            })
    })

    it('fails to delete a group with a non-existent user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const groupName = 'Miercoles'
        const day = 'wednesday'
        const time = '20:00'
        const location = 'Joan Miro'

        let userId = null
        let groupId = null
        const failedUserId = '123123123123123123123123'
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => userId = user.id)
            .then(() => Group.create({ owner: userId, name: groupName, day, time, location }))
            .then(group => groupId = group.id)
            .then(() => deleteGroup(failedUserId, groupId))
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