import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getTrainingsForCoach } from './getTrainingsForCoach.js'
import { User, Training, Group } from '../data/index.js'
import { calculateNextTrainingDate } from './helpers/calculateNextTrainingDate.js'
import { getDayOfWeekNumber } from './helpers/getDayOfWeekNumber.js'
import { NotFoundError, RoleError } from 'com'

describe('getTrainingsForCoach', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Training.deleteMany()]))

    it('gets the future trainings for a coach', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const playerName1 = 'Peter Pan'
        const playerEmail1 = 'peter@pan.com'
        const playerPassword1 = 'peter123'
        const playerRole1 = 'player'

        const playerName2 = 'James Hook'
        const playerEmail2 = 'james@hook.com'
        const playerPassword2 = 'james123'
        const playerRole2 = 'player'

        const groupName1 = 'Miercoles'
        const day1 = 'wednesday'
        const time1 = '20:00'
        const location1 = 'Joan Miro'

        const groupName2 = 'Jueves'
        const day2 = 'thursday'
        const time2 = '20:00'
        const location2 = 'Barceloneta'

        let coachId = null
        let groupId1 = null
        let groupId2 = null
        let playerId1 = null
        let playerId2 = null

        let trainingDate1 = null
        let trainingDate2 = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword1, 10))
            .then(hash => User.create({ name: playerName1, email: playerEmail1, password: hash, role: playerRole1 }))
            .then(player => playerId1 = player.id)
            .then(() => bcrypt.hash(playerPassword2, 10))
            .then(hash => User.create({ name: playerName2, email: playerEmail2, password: hash, role: playerRole2 }))
            .then(player => playerId2 = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName1, players: [playerId1], day: day1, time: time1, location: location1, coach: coachId }))
            .then(group => groupId1 = group.id)
            .then(() => Group.create({ owner: coachId, name: groupName2, players: [playerId2], day: day2, time: time2, location: location2, coach: coachId }))
            .then(group => groupId2 = group.id)
            .then(() => {
                trainingDate1 = calculateNextTrainingDate(getDayOfWeekNumber(day1))
                trainingDate1.setHours(20, 0, 0, 0)
            })
            .then(() => {
                trainingDate2 = calculateNextTrainingDate(getDayOfWeekNumber(day2))
                trainingDate2.setHours(19, 0, 0, 0)
            })
            .then(() => Training.create({ group: groupId1, date: trainingDate1, coach: coachId }))
            .then(() => Training.create({ group: groupId2, date: trainingDate2, coach: coachId }))
            .then(() => getTrainingsForCoach(coachId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(2)
                expect(trainings[1].date.toString()).to.equal(trainingDate1.toString())
                expect(trainings[1].group.id).to.equal(groupId1)
                expect(trainings[0].date.toString()).to.equal(trainingDate2.toString())
                expect(trainings[0].group.id).to.equal(groupId2)
            })
    })

    it('gets the past trainings for a coach', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = 'pepito123'
        const role = 'coach'

        const playerName1 = 'Peter Pan'
        const playerEmail1 = 'peter@pan.com'
        const playerPassword1 = 'peter123'
        const playerRole1 = 'player'

        const playerName2 = 'James Hook'
        const playerEmail2 = 'james@hook.com'
        const playerPassword2 = 'james123'
        const playerRole2 = 'player'

        const groupName1 = 'Miercoles'
        const day1 = 'wednesday'
        const time1 = '20:00'
        const location1 = 'Joan Miro'

        const groupName2 = 'Jueves'
        const day2 = 'thursday'
        const time2 = '20:00'
        const location2 = 'Barceloneta'

        let coachId = null
        let groupId1 = null
        let groupId2 = null
        let playerId1 = null
        let playerId2 = null

        let trainingDate1 = null
        let trainingDate2 = null

        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, email, password: hash, role }))
            .then(coach => coachId = coach.id)
            .then(() => bcrypt.hash(playerPassword1, 10))
            .then(hash => User.create({ name: playerName1, email: playerEmail1, password: hash, role: playerRole1 }))
            .then(player => playerId1 = player.id)
            .then(() => bcrypt.hash(playerPassword2, 10))
            .then(hash => User.create({ name: playerName2, email: playerEmail2, password: hash, role: playerRole2 }))
            .then(player => playerId2 = player.id)
            .then(() => Group.create({ owner: coachId, name: groupName1, players: [playerId1], day: day1, time: time1, location: location1, coach: coachId }))
            .then(group => groupId1 = group.id)
            .then(() => Group.create({ owner: coachId, name: groupName2, players: [playerId2], day: day2, time: time2, location: location2, coach: coachId }))
            .then(group => groupId2 = group.id)
            .then(() => {
                trainingDate1 = new Date()
                trainingDate1.setDate(trainingDate1.getDate() - 1)
            })
            .then(() => {
                trainingDate2 = new Date()
                trainingDate2.setDate(trainingDate2.getDate() - 2)
            })
            .then(() => Training.create({ group: groupId1, date: trainingDate1, coach: coachId }))
            .then(() => Training.create({ group: groupId2, date: trainingDate2, coach: coachId }))
            .then(() => getTrainingsForCoach(coachId))
            .then(trainings => {
                expect(trainings).to.exist.and.to.be.an.instanceOf(Array)
                expect(trainings.length).to.equal(2)
                expect(trainings[0].date.toString()).to.equal(trainingDate1.toString())
                expect(trainings[0].group.id.toString()).to.equal(groupId1)
                expect(trainings[1].date.toString()).to.equal(trainingDate2.toString())
                expect(trainings[1].group.id.toString()).to.equal(groupId2)
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Training.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})