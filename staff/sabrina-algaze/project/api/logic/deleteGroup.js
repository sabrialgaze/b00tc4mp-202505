import { validate, NotFoundError, RoleError, SystemError, OwnershipError } from 'com'
import { Group, User } from '../data/index.js'

export const deleteGroup = (coachId, groupId) => {
    validate.userId(coachId)
    validate.groupId(groupId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return Group.findById(groupId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (group.owner.toString() !== coachId) throw new OwnershipError('user is not the owner')

                    return Group.findByIdAndDelete(groupId)
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(group => {
                            if (!group) throw new NotFoundError('group not found')
                        })
                })
        })
}
