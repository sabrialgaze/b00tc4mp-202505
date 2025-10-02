import { validate, NotFoundError, SystemError } from 'com'
import { User, Training } from '../data/index.js'

export const getJoinedPlayersFromTraining = (userId, trainingId) => {
    validate.userId(userId)
    validate.trainingId(trainingId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Training.findById(trainingId)
                .lean()
                .populate('joined', '-_id name')
                .catch(error => { throw new SystemError('mongo error') })
                .then(training => {
                    if (!training) throw new NotFoundError('training not found')

                    return training.joined
                })
        })
}


