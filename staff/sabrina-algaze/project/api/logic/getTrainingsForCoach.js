import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Training } from '../data/index.js'

export const getTrainingsForCoach = coachId => {
    validate.userId(coachId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user is not a coach')

            return Training.find({ coach: coachId })
                .sort({ date: -1 })
                .populate('group', 'name location players')
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(trainings => {
                    if (!trainings) throw new NotFoundError('no training found')

                    trainings.forEach(training => {
                        training.id = training._id.toString()

                        delete training._id

                        training.group.id = training.group._id.toString()

                        training.group.playersCount = training.group.players.length
                    })
                    trainings.forEach(training => {
                        delete training.group._id

                        delete training.group.players
                    })
                    return trainings
                })
        })
}