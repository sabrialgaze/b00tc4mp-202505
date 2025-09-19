import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const editGroup = (userId, groupId, updates) => {
    validate.userId(userId)
    validate.groupId(groupId)
    validate.updates(updates)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return Group.findByIdAndUpdate(groupId, updates)
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')
                })
        })
}