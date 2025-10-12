import { validate, NotFoundError, SystemError } from 'com'
import { Training, User } from '../data/index.js'

export const getTrainingById = (userId, trainingId) => {
    validate.userId(userId)
    validate.trainingId(trainingId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Training.findById(trainingId)
                .populate('group', 'name location players')
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(training => {
                    if (!training) throw new NotFoundError('training not found')

                    training.id = training._id.toString()
                    delete training._id

                    training.group.playersCount = training.group.players.length
                    delete training.group.players

                    training.isJoined = training.joined.some(joinedPlayer => joinedPlayer.toString() === userId)

                    return training
                })
        })
}
