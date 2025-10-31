import mongoose from 'mongoose'
import { User, Group, Training, Payment } from './index.js'
import { getDayOfWeekNumber } from '../logic/helpers/getDayOfWeekNumber.js'
import { calculateNextTrainingDate } from '../logic/helpers/calculateNextTrainingDate.js'
import bcrypt from 'bcryptjs'

mongoose.connect('mongodb://127.0.0.1:27017/project')
    .then(() => console.log('Connected'))
    .then(() => {
        return Promise.all([
            User.deleteMany(),
            Group.deleteMany(),
            Training.deleteMany(),
            Payment.deleteMany()
        ])
    })
    .then(() => {
        return bcrypt.hash('qwe123', 10)
    })
    .then(hash => {
        const coach = new User({
            name: 'Pepito Grillo',
            email: 'pepito@grillo.com',
            password: hash,
            role: 'coach'
        })

        const player1 = new User({
            name: 'Peter Pan',
            email: 'peter@pan.com',
            password: hash,
            role: 'player'
        })

        const player2 = new User({
            name: 'James Hook',
            email: 'james@hook.com',
            password: hash,
            role: 'player'
        })

        const player3 = new User({
            name: 'Wendy Darling',
            email: 'wendy@darling.com',
            password: hash,
            role: 'player'
        })

        return Promise.all([coach.save(), player1.save(), player2.save(), player3.save()])
    })
    .then(([coach, player1, player2, player3]) => {
        console.log('Users created')

        const group = new Group({
            name: 'Miercoles',
            day: 'wednesday',
            time: '20:00',
            location: 'Joan Miro',
            owner: coach.id,
            coach: coach.id,
            players: [player1.id, player2.id, player3.id]
        })

        return group.save().then(group => ({ group, player1, player2, player3 }))
    })
    .then(({ group, player1, player2, player3 }) => {
        console.log('Group created')

        const nextTrainingDate = calculateNextTrainingDate(getDayOfWeekNumber('wednesday'))

        const [hours, minutes] = group.time.split(':').map(Number)
        nextTrainingDate.setHours(hours, minutes, 0, 0)

        const nextTraining = new Training({
            group: group.id,
            date: nextTrainingDate,
            coach: group.coach,
            joined: [player2.id, player3.id]
        })

        const pastTrainingDate = new Date(nextTrainingDate)
        pastTrainingDate.setDate(pastTrainingDate.getDate() - 7)
        pastTrainingDate.setHours(hours, minutes, 0, 0)


        const pastTraining = new Training({
            group: group.id,
            date: pastTrainingDate,
            coach: group.coach,
            joined: [player1.id, player2.id, player3.id]
        })

        const notJoinedPastTraining = new Training({
            group: group.id,
            date: new Date(pastTrainingDate.getTime() - 7 * 24 * 60 * 60 * 1000),
            coach: group.coach,
            joined: [player2.id]
        })

        const notPaidPastTraining = new Training({
            group: group.id,
            date: new Date(2025, 7, 27, 20, 0, 0, 0),
            coach: group.coach,
            joined: [player2.id]
        })

        return Promise.all([nextTraining.save(), pastTraining.save(), notJoinedPastTraining.save(), notPaidPastTraining.save()]).then(([nextTraining, pastTraining, notJoinedPastTraining, notPaidPastTraining]) => ({ player1, group, pastTrainingDate }))
    })
    .then(({ player1, group, pastTrainingDate }) => {
        console.log('Trainings created')

        const payment1 = new Payment({
            player: player1.id,
            group: group.id,
            service: 'month',
            date: new Date(2025, 8, 1),
            trainingDate: new Date(2025, 8, 1, 20, 0, 0, 0)
        })

        const payment2 = new Payment({
            player: player1.id,
            group: group.id,
            service: 'day',
            date: new Date(2025, 9, 14),
            trainingDate: pastTrainingDate
        })

        const payment3 = new Payment({
            player: player1.id,
            group: group.id,
            service: 'day',
            date: new Date(pastTrainingDate.getTime() - 8 * 24 * 60 * 60 * 1000),
            trainingDate: new Date(pastTrainingDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        })

        return Promise.all([payment1.save(), payment2.save(), payment3.save()])
    })
    .then(([payment1, payment2, payment3]) => {
        console.log('Payments created')

        return mongoose.disconnect()
    })
    .catch(error => {
        console.error(error)
        return mongoose.disconnect()
    })