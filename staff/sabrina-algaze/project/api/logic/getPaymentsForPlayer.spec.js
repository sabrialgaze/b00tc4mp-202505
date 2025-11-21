import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getPaymentsForPlayer } from './getPaymentsForPlayer.js'
import { User, Group, Payment } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('getPaymentsForPlayer', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Payment.deleteMany()]))

    it.skip('gets all payments for a player', () => {
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
        let paymentId = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => coachId = user.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(user => playerId = user.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'day' }))
            .then(payment => paymentId = payment.id)
            .then(() => getPaymentsForPlayer(playerId))
            .then(payments => {
                expect(payments).to.be.an('array')
                expect(payments.length).to.be.equal(1)
                expect(payments[0].id).to.be.equal(paymentId)
            })
    })

    it.skip('fails to get payments for a coach role user', () => {
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
        let paymentId = null
        let caughtError = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(user => coachId = user.id)
            .then(() => bcrypt.hash(playerPassword, 10))
            .then(hash => User.create({ name: playerName, email: playerEmail, password: hash, role: playerRole }))
            .then(user => playerId = user.id)
            .then(() => Group.create({ owner: coachId, name: groupName, day, time, location, coach: coachId, players: [playerId] }))
            .then(group => groupId = group.id)
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'day' }))
            .then(payment => paymentId = payment.id)
            .then(() => getPaymentsForPlayer(coachId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a player')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Payment.deleteMany()]))

    after(() => disconnect())
})