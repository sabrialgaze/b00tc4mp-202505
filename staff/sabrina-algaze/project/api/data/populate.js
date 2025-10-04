import mongoose from 'mongoose'
import { User, Group, Training } from './index.js'
import { getDayOfWeekNumber } from '../logic/helpers/getDayOfWeekNumber.js'
import { calculateNextTrainingDate } from '../logic/helpers/calculateNextTrainingDate.js'
import bcrypt from 'bcryptjs'

mongoose.connect('mongodb://127.0.0.1:27017/project')
    .then(() => console.log('Connected'))
    .then(() => {
        return Promise.all([
            User.deleteMany(),
            Group.deleteMany(),
            Training.deleteMany()
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

        const player = new User({
            name: 'Peter Pan',
            email: 'peter@pan.com',
            password: hash,
            role: 'player'
        })

        return Promise.all([coach.save(), player.save()])
    })
    .then(([coach, player]) => {
        console.log('Users created')

        const group = new Group({
            name: 'Miercoles',
            day: 'wednesday',
            time: '20:00',
            location: 'Joan Miro',
            owner: coach.id,
            coach: coach.id,
            players: [player.id]
        })

        return group.save().then(group => ({ group, player }))
    })
    .then(({ group, player }) => {
        console.log('Group created')

        const nextTrainingDate = calculateNextTrainingDate(getDayOfWeekNumber('wednesday'))

        const [hours, minutes] = group.time.split(':').map(Number)
        nextTrainingDate.setHours(hours, minutes, 0, 0)

        const nextTraining = new Training({
            group: group.id,
            date: nextTrainingDate,
            coach: group.coach,
            joined: [player.id]
        })

        const pastTrainingDate = new Date(nextTrainingDate)
        pastTrainingDate.setDate(pastTrainingDate.getDate() - 7)
        pastTrainingDate.setHours(hours, minutes, 0, 0)


        const pastTraining = new Training({
            group: group.id,
            date: pastTrainingDate,
            coach: group.coach,
            joined: [player.id]
        })

        return Promise.all([nextTraining.save(), pastTraining.save()])
    })
    .then(() => {
        console.log('Next and past training created')

    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => {
        return mongoose.disconnect()
    })