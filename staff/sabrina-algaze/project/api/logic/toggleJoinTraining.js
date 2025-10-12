import { validate, NotFoundError, RoleError, SystemError, ValidationError } from 'com'
import { User, Group, Training } from '../data/index.js'

export const toggleJoinTraining = (playerId, trainingId) => {
    validate.userId(playerId)
    validate.trainingId(trainingId)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'player') throw new RoleError('user is not a player')

            return Training.findById(trainingId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(training => {
                    if (!training) throw new NotFoundError('training not found')

                    if (training.date < new Date()) throw new ValidationError('cannot join/unjoin past training')

                    return Group.findById(training.group)
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(group => {
                            if (!group) throw new NotFoundError('group not found')
                            if (!group.players.includes(playerId)) throw new NotFoundError('player not found in group')

                            return Training.updateOne(
                                { _id: trainingId },
                                { $addToSet: { joined: playerId } }
                            )
                                .catch(error => { throw new SystemError('mongo error') })
                                .then(result => {
                                    if (result.modifiedCount === 0) {
                                        return Training.updateOne(
                                            { _id: trainingId, joined: playerId },
                                            { $pull: { joined: playerId } }
                                        )
                                            .catch(error => { throw new SystemError('mongo error') })
                                            .then(() => { })
                                    }
                                })
                        })
                })
        })
}