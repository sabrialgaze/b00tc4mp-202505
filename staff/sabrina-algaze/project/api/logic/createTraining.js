import { validate, NotFoundError, SystemError, DuplicityError, RoleError } from 'com'
import { User, Group, Training } from '../data/index.js'
import { getDayOfWeekNumber } from './helpers/getDayOfWeekNumber.js'
import { calculateNextTrainingDate } from './helpers/calculateNextTrainingDate.js'

export const createTraining = (coachId, groupId) => {
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
                    if (!group) throw new NotFoundError('group not found')

                    const { day, time, coach } = group

                    const groupDayNumber = getDayOfWeekNumber(day)

                    const nextTrainingDate = calculateNextTrainingDate(groupDayNumber)

                    return Training.findOne({
                        group: groupId,
                        date: nextTrainingDate
                    })
                        .then(training => {
                            if (training) {
                                throw new DuplicityError('training already exists')
                            }

                            const [hours, minutes] = time.split(':').map(Number)
                            nextTrainingDate.setHours(hours, minutes)

                            return Training.create({
                                group: group.id,
                                date: nextTrainingDate,
                                coach: coach,
                                joined: [],
                                invited: []
                            })
                                .then(() => { })
                        })
                })
        })
}