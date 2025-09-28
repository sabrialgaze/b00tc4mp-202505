import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const addPlayerToGroup = (coachId, groupId, playerEmail) => {
    validate.userId(coachId)
    validate.groupId(groupId)
    validate.email(playerEmail)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return User.findOne({ email: playerEmail })
                .catch(error => { throw new SystemError('mongo error') })
                .then(player => {
                    if (!player) throw new NotFoundError('player not found')

                    return Group.findByIdAndUpdate(groupId, { $push: { players: player.id } })
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(group => {
                            if (!group) throw new NotFoundError('group not found')
                        })
                })
        })
}
