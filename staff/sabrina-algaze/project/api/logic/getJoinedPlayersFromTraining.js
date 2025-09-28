import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Training } from '../data/index.js'

export const getJoinedPlayersFromTraining = trainingId => {
    validate.trainingId(trainingId)

    return Training.findById(trainingId)
        .populate('joined', 'name')
        .catch(error => { throw new SystemError('mongo error') })
        .then(training => {
            if (!training) throw new NotFoundError('training not found')

            return training.joined
        })
}