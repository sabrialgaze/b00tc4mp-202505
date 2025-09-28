import { connect, disconnect } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { getGroupsForCoach } from './getGroupsForCoach.js'
import { User, Group } from '../data/index.js'
import { RoleError, NotFoundError } from 'com'

describe('getGroupsForCoach', () => {
    before(() => connect(process.env.MONGO_URI_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('it gets all groups assigned to a specific coach', () => {
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

    afterEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    after(() => disconnect())
})