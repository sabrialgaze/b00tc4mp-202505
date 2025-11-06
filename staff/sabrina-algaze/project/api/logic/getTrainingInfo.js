import { validate, NotFoundError, SystemError } from 'com'
import { Training, User } from '../data/index.js'

export const getTrainingInfo = (userId, trainingId) => {
    validate.userId(userId)
    validate.trainingId(trainingId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Training.findById(trainingId)
                .populate('group', 'name location players')
                .populate('joined', 'name')
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(training => {
                    if (!training) throw new NotFoundError('training not found')

                    training.id = training._id.toString()
                    delete training._id

                    training.group.id = training.group._id.toString()
                    delete training.group._id
                    delete training.group.__v

                    training.group.playersCount = training.group.players.length
                    delete training.group.players

                    training.isPast = training.date < new Date()

                    training.isJoined = training.joined.some(joinedPlayer => joinedPlayer._id.toString() === userId)

                    training.joined.forEach(joinedPlayer => {
                        joinedPlayer.id = joinedPlayer._id.toString()
                        delete joinedPlayer._id
                    })
                    return training
                })
        })
}
