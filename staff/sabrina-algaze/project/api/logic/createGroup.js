import { validate, NotFoundError, RolePermissionError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const createGroup = (userId, name, dayOfWeek, time, coachId) => {
    validate.userId(userId)
    validate.name(name)
    validate.dayOfWeek(dayOfWeek)
    validate.time(time)
    validate.coachId(coachId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RolePermissionError('user does not have permission to create a group')

            return Group.create({
                name,
                schedule: { dayOfWeek, time },
                coach: coachId
            })
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => { })
        })
}