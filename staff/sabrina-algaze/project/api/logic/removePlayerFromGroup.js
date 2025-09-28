import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const removePlayerFromGroup = (coachId, groupId, playerId) => {
    validate.userId(coachId)
    validate.groupId(groupId)
    validate.userId(playerId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return Group.findByIdAndUpdate(groupId, { $pull: { players: playerId } })
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')
                })
        })
}