import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group } from '../data/index.js'

export const getGroupsForPlayer = playerId => {
    validate.userId(playerId)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'player') throw new RoleError('user is not a player')

            return Group.find({ players: playerId })
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(groups => {
                    return groups.map(group => {
                        group.id = group._id.toString()
                        delete group._id

                        return group
                    })
                })
        })
}