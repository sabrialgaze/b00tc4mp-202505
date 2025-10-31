import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Training, Payment } from '../data/index.js'

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
                        group: { $in: groupIds }
                    }, { __v: 0 })
                        .sort({ date: -1 })
                        .populate('group', 'name location players')
                        .lean()
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(trainings => {
                            if (!trainings) throw new NotFoundError('no training found')

                            return Promise.all(trainings.map(training => {
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
                                            training.isPaid = true
                                        } else {
                                            return Payment.findOne({
                                                player: playerId,
                                                group: training.group._id,
                                                service: 'day',
                                                trainingDate: training.date
                                            })
                                                .then(dayPayment => {
                                                    training.isPaid = !!dayPayment
                                                })
                                        }
                                    })
                                    .then(() => {
                                        training.id = training._id.toString()

                                        delete training._id

                                        training.group.playersCount = training.group.players.length

                                        training.isPast = training.date < new Date()

                                        training.isJoined = training.joined.some(joinedPlayer => joinedPlayer.toString() === playerId)

                                        return training
                                    })
                            }))
                                .then(trainings => {
                                    trainings.forEach(training => {
                                        delete training.group._id

                                        delete training.group.players
                                    })

                                    return trainings
                                })
                        })
                })
        })
}