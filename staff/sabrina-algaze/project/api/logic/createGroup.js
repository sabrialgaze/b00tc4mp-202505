import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { Group, User } from '../data/index.js'

export const createGroup = (ownerId, name, day, time, location, coachEmail) => {
    validate.userId(ownerId)
    validate.name(name)
    validate.day(day)
    validate.time(time)
    validate.location(location)
    validate.email(coachEmail)

    return User.findById(ownerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user role is not coach')

            return User.findOne({ email: coachEmail })
                .catch(error => { throw new SystemError('mongo error') })
                .then(coach => {
                    if (!coach) throw new NotFoundError('coach not found')

                    return Group.create({
                        owner: ownerId,
                        name,
                        day,
                        time,
                        location,
                        coach: coach.id,
                    })
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(group => { })
                })
        })
}