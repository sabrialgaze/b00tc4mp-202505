import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const updateGroup = (coachId, groupId, updates) => {
    validate.userId(coachId)
    validate.groupId(groupId)
    validate.updates(updates)

    return User.findById(coachId)
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