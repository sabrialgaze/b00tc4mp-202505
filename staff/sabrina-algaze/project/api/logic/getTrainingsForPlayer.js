import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Training } from '../data/index.js'

export const getTrainingsForPlayer = playerId => {
    validate.userId(playerId)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'player') throw new RoleError('user is not a player')

            return Group.find({ players: playerId })
                .catch(error => { throw new SystemError('mongo error') })
                .then(groups => {
                    if (groups.length === 0) throw new NotFoundError('no groups found')

                    return Training.find({
                        $or: [
                            {
                                group: { $in: groups.map(group => group.id) },
                                date: { $gte: new Date() }
                            },
                            {
                                group: { $in: groups.map(group => group.id) },
                                date: { $lt: new Date() },
                                joined: playerId
                            }
                        ]
                    })
                        .sort({ date: 1 })
                        .lean()
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(trainings => {
                            if (!trainings) throw new NotFoundError('no training found')

                            return trainings.map(training => {
                                training.id = training._id.toString()
                                delete training._id

                                return training
                            })
                        })
                })
        })
}