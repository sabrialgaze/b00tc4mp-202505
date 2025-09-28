import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Training } from '../data/index.js'

export const getNextTrainingForPlayer = playerId => {
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
                        group: { $in: groups.map(group => group.id) },
                        date: { $gt: new Date() }
                    })
                        .sort({ date: 1 })
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(trainings => {
                            if (!trainings) throw new NotFoundError('no training found')

                            return trainings
                        })
                })
        })
}