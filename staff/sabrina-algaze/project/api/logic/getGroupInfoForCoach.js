import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group } from '../data/index.js'

export const getGroupInfoForCoach = (coachId, groupId) => {
    validate.userId(coachId)
    validate.groupId(groupId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user is not a coach')

            return Group.findById(groupId)
                .populate('players', '-_id name')
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')
                    group.id = group._id.toString()
                    delete group._id

                    return group
                })
        })
}
