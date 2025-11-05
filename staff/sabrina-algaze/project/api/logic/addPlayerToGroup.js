import { validate, NotFoundError, RoleError, SystemError, DuplicityError } from 'com'
import { Group, User } from '../data/index.js'

export const addPlayerToGroup = (coachId, groupId, playerEmail) => {
    validate.userId(coachId)
    validate.groupId(groupId)
    validate.email(playerEmail)

    return User.findById(coachId)
        .lean()
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return User.findOne({ email: playerEmail })
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(player => {
                    if (!player) throw new NotFoundError('player not found')
                    if (player.role !== 'player') throw new RoleError('user role is not player')

                    return Group.findById(groupId)
                        .lean()
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(group => {
                            if (!group) throw new NotFoundError('group not found')
                            if (group.players.some(playerId => playerId.toString() === player._id.toString())) throw new DuplicityError('player already in group')

                            return Group.updateOne(
                                { _id: groupId },
                                { $addToSet: { players: player._id } }
                            )
                                .catch(error => { throw new SystemError('mongo error') })
                                .then(() => { })
                        })
                })
        })
}
