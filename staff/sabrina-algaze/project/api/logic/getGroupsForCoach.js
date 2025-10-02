import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Group } from '../data/index.js'

export const getGroupsForCoach = coachId => {
    validate.userId(coachId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user is not a coach')

            return Group.find({ coach: coachId })
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(groups => {
                    if (groups.length === 0) throw new NotFoundError('groups not found')

                    return groups.map(group => {
                        group.id = group._id.toString()
                        delete group._id

                        return group
                    })
                })
        })
}
