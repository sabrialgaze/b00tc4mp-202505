import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Training } from '../data/index.js'

export const getTrainingsForPlayer = playerId => {
    validate.userId(playerId)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'player') throw new RoleError('user is not a player')

            return Training.aggregate([
                {
                    $lookup: {
                        from: 'groups',
                        localField: 'group',
                        foreignField: '_id',
                        as: 'groupData',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    location: 1,
                                    players: 1,
                                    __v: 0
                                }
                            }
                        ]
                    }
                },
                {
                    $match: {
                        'groupData.players': playerId,
                        $or: [
                            { date: { $gte: new Date() } },
                            { date: { $lt: new Date() }, joined: playerId }
                        ]
                    }
                },
                {
                    $addFields: {
                        group: { $arrayElemAt: ['$groupData', 0] }
                    }
                },
                {
                    $project: {
                        __v: 0,
                        groupData: 0,
                        'group.__v': 0
                    }
                },
                {
                    $sort: { date: -1 }
                }
            ])
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
}