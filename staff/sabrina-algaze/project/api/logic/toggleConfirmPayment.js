import { validate, NotFoundError, RoleError, SystemError } from 'com'
import { User, Payment } from '../data/index.js'

export const toggleConfirmPayment = (coachId, paymentId) => {
    validate.userId(coachId)
    validate.paymentId(paymentId)

    return User.findById(coachId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'coach') throw new RoleError('user is not a coach')

            return Payment.findById(paymentId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(payment => {
                    if (!payment) throw new NotFoundError('payment not found')

                    return Payment.updateOne(
                        { _id: paymentId },
                        { $set: { confirmed: !payment.confirmed } }
                    )
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(() => { })
                })
        })
}