import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Payment } from '../data/index.js'

export const getPaymentsForPlayer = playerId => {
    validate.userId(playerId)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'player') throw new RoleError('user is not a player')

            return Payment.find({ player: playerId })
                .sort({ date: -1 })
                .populate('group', 'name')
                .lean()
                .catch(error => { throw new SystemError('mongo error') })
                .then(payments => {
                    if (payments.length === 0) throw new NotFoundError('payments not found')

                    return payments.map(payment => {
                        payment.id = payment._id.toString()
                        delete payment._id

                        return payment
                    })
                })
        })
}

