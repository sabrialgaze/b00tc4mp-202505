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

                    // ya he pagado algun day? si es así, lanzo error y no puedo pagar otro day
                    if (service === 'day') {
                        return Training.findOne({
                            group: groupId,
                            date: { $gte: new Date() }
                        })
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(nextTraining => {
                                if (!nextTraining) throw new NotFoundError('no next training found')

                                return Payment.findOne({
                                    player: playerId,
                                    service: 'day',
                                    group: groupId,
                                    trainingDate: nextTraining.date
                                })
                                    .catch(error => { throw new SystemError('mongo error') })
                                    .then(existingPayment => {
                                        if (existingPayment) throw new DuplicityError('you have already paid a day service')

                                        return Payment.create({ player: playerId, group: groupId, service, trainingDate: nextTraining.date })
                                            .catch(error => { throw new SystemError('mongo error') })
                                            .then(() => { })
                                    })
                            })
                    }

                    // ya he pagado algun month? si es así, lanzo error y no puedo pagar otro month (tiene que finalizar el ultimo entrenamiento del mes anterior)
                    if (service === 'month') {
                        return Training.findOne({
                            group: groupId,
                            date: { $gte: new Date() }
                        })
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(nextTraining => {
                                if (!nextTraining) throw new NotFoundError('no next training found')

                                return Payment.findOne({
                                    player: playerId,
                                    service: 'month',
                                    group: groupId,
                                    $expr: {
                                        $eq: [
                                            { $dateToString: { format: "%Y-%m", date: "$trainingDate" } },
                                            { $dateToString: { format: "%Y-%m", date: nextTraining.date } }
                                        ]
                                    }
                                })
                                    .catch(error => { throw new SystemError('mongo error') })
                                    .then(existingPayment => {
                                        if (existingPayment) throw new DuplicityError('you have already paid a month service')

                                        return Payment.create({ player: playerId, group: groupId, service, trainingDate: nextTraining.date })
                                            .catch(error => { throw new SystemError('mongo error') })
                                            .then(() => { })
                                    })
                            })
                    }
                })
        })
}