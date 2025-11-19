import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Payment, Group } from '../data/index.js'

export const getPaymentsForCoach = coachId => {
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
                    const groupIds = groups.map(group => group._id)

                    return Payment.find({ group: { $in: groupIds } })
                        .sort({ confirmed: 1, date: -1 })
                        .populate('player', 'name')
                        .populate('group', 'name')
                        .lean()
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(payments => {
                            return payments.map(payment => {
                                payment.id = payment._id.toString()
                                delete payment._id

                                return payment
                            })
                        })
                })
        })
}