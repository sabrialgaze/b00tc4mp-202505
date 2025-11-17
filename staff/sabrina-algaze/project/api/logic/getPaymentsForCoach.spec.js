import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getPaymentsForCoach } from './getPaymentsForCoach.js'
import { User, Payment, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe.only('getPaymentsForCoach', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Payment.deleteMany()]))

    it('gets all payments for a coach', () => {
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
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'day', trainingDate: new Date() }))
            .then(payment => paymentId = payment.id)
            .then(() => getPaymentsForCoach(coachId))
            .then(payments => {
                expect(payments).to.be.an('array')
                expect(payments.length).to.be.equal(1)
                expect(payments[0].id).to.be.equal(paymentId)
                expect(payments[0].player.name).to.be.equal(playerName)
                expect(payments[0].group.name).to.be.equal(groupName)
                expect(payments[0].service).to.be.equal('day')
            })

    })

    it('fails to get payments for a player role user', () => {
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
            .then(() => Payment.create({ player: playerId, group: groupId, service: 'day', trainingDate: new Date() }))
            .then(payment => paymentId = payment.id)
            .then(() => getPaymentsForCoach(playerId))
            .catch(error => caughtError = error)
            .finally(() => {
                expect(caughtError).to.exist
                expect(caughtError).to.be.an.instanceOf(RoleError)
                expect(caughtError.message).to.equal('user is not a coach')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany(), Payment.deleteMany()]))

    after(() => disconnect())
})