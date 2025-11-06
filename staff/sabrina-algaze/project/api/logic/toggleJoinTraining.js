import { validate, NotFoundError, RoleError, SystemError, ValidationError } from 'com'
import { User, Group, Training, Payment } from '../data/index.js'

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

                            //TODO: check if the player has paid for the training
                            return Payment.findOne({
                                player: playerId,
                                group: training.group._id,
                                service: 'month',
                                $expr: {
                                    $eq: [
                                        { $dateToString: { format: "%Y-%m", date: "$trainingDate" } },
                                        { $dateToString: { format: "%Y-%m", date: training.date } }
                                    ]
                                }
                            })
                                .then(monthPayment => {
                                    if (monthPayment) {
                                        return true
                                    } else {
                                        return Payment.findOne({
                                            player: playerId,
                                            group: training.group._id,
                                            service: 'day',
                                            trainingDate: training.date
                                        })
                                            .then(dayPayment => {
                                                if (!dayPayment) {
                                                    throw new ValidationError('training is not paid')
                                                }
                                                return true
                                            })
                                    }
                                })
                                .then(() => {
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
        })
}