import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group, Payment } from '../data/index.js'

export const createPayment = (playerId, groupId, service) => {
    validate.userId(playerId)
    validate.groupId(groupId)
    validate.service(service)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(player => {
            if (!player) throw new NotFoundError('user not found')
            if (player.role !== 'player') throw new RoleError('user is not a player')

            return Group.findById(groupId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')
                    if (!group.players.includes(playerId)) throw new NotFoundError('user is not in the group')

                    return Payment.create({ player: playerId, group: groupId, service })
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(() => { })
                })
        })
}