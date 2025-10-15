import { validate, NotFoundError, RoleError, SystemError, DuplicityError } from 'com'
import { User, Group, Payment, Training } from '../data/index.js'

export const createPayment = (playerId, groupId, service) => {
    validate.userId(playerId)
    validate.groupId(groupId)
    validate.service(service)

    return User.findById(playerId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(player => {
            if (!player) throw new NotFoundError('user not found')
            if (player.role !== 'player') throw new RoleError('user is not a player')

            return Group.findById(groupId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')
                    if (!group.players.includes(playerId)) throw new NotFoundError('user is not in the group')

                    // ya he pagado algun daily? si es así, lanzo error y no puedo pagar otro daily
                    if (service === 'daily') {
                        return Promise.all([

                            Training.findOne({
                                group: groupId,
                                date: { $lt: new Date() }
                            }).sort({ date: -1 }),

                            Training.findOne({
                                group: groupId,
                                date: { $gte: new Date() }
                            }).sort({ date: 1 }),
                        ])
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(([lastTraining, nextTraining]) => {
                                const startDate = lastTraining.date
                                const endDate = nextTraining.date

                                return Payment.findOne({
                                    player: playerId,
                                    service: 'daily',
                                    group: groupId,
                                    date: { $gte: startDate, $lt: endDate }
                                })
                                    .catch(error => { throw new SystemError('mongo error') })
                                    .then(existingPayment => {
                                        if (existingPayment) throw new DuplicityError('you have already paid a daily service')

                                        return Payment.create({ player: playerId, group: groupId, service })
                                            .catch(error => { throw new SystemError('mongo error') })
                                            .then(() => { })
                                    })

                            })
                    }

                    // ya he pagado algun month? si es así, lanzo error y no puedo pagar otro month (tiene que finalizar el ultimo entrenamiento del mes anterior)
                    if (service === 'monthly') {
                        return Payment.findOne({
                            player: playerId,
                            service: 'monthly',
                            group: groupId,
                            $expr: {
                                $eq: [
                                    { $dateToString: { format: '%Y-%m', date: '$date' } },
                                    { $dateToString: { format: '%Y-%m', date: new Date() } }
                                ]
                            }
                        })
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(existingPayment => {
                                if (existingPayment) throw new DuplicityError('you have already paid a monthly service')

                                return Payment.create({ player: playerId, group: groupId, service })
                                    .catch(error => { throw new SystemError('mongo error') })
                                    .then(() => { })
                            })
                    }
                })
        })
}