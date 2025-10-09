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
                    //TODO: optimize this, we are doing two queries to the database

                    const groupIds = groups.map(group => group.id)

                    return Training.find({
                        $or: [
                            {
                                group: { $in: groupIds },
                                date: { $gte: new Date() }
                            },
                            {
                                group: { $in: groupIds },
                                date: { $lt: new Date() },
                                joined: playerId
                            }
                        ]
                    }, { __v: 0 })
                        .sort({ date: -1 })
                        .populate({
                            path: 'group',
                            select: 'name location players'
                        })
                        .lean()
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(trainings => {
                            if (!trainings) throw new NotFoundError('no training found')

                            trainings.forEach(training => {
                                training.id = training._id.toString()
                                delete training._id

                                training.group.playersCount = training.group.players.length

                                return training
                            })

                            trainings.forEach(training => {
                                delete training.group._id

                                delete training.group.players
                            })

                            return trainings
                        })
                })
        })
}