import { ValidationError } from './errors.js'
export const validate = {
    name(name) {
        if (typeof name !== 'string') throw new ValidationError('invalid name')
        if (!name.length) throw new ValidationError('invalid name length')

        const nameRegex = /^[a-zA-Z\s]+$/
        if (!nameRegex.test(name)) throw new ValidationError('invalid name format')
    },

    email(email) {
        if (typeof email !== 'string') throw new ValidationError('invalid email')
        if (!email.length) throw new ValidationError('invalid email length')

        const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
        if (!emailRegex.test(email)) throw new ValidationError('invalid email format')
    },

    password(password) {
        if (typeof password !== 'string') throw new ValidationError('invalid password')
        if (!password.length) throw new ValidationError('invalid password length')

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (!passwordRegex.test(password)) throw new ValidationError('invalid password format')
    },

    userId(userId) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
    },

    playerId(playerId) {
        if (typeof playerId !== 'string') throw new ValidationError('invalid playerId type')
    },

    groupId(groupId) {
        if (typeof groupId !== 'string') throw new ValidationError('invalid groupId type')
    },

    trainingId(trainingId) {
        if (typeof trainingId !== 'string') throw new ValidationError('invalid trainingId type')
    },

    day(day) {
        if (typeof day !== 'string') throw new ValidationError('invalid dayOfWeek type')
    },

    time(time) {
        if (typeof time !== 'string') throw new ValidationError('invalid time type')
    },

    month(month) {
        if (typeof month !== 'number') throw new ValidationError('invalid month type')
    },

    year(year) {
        if (typeof year !== 'number') throw new ValidationError('invalid year type')
    },

    location(location) {
        if (typeof location !== 'string') throw new ValidationError('invalid location type')
    },

    updates(updates) {
        if (typeof updates !== 'object') throw new ValidationError('invalid updates type')
        if (!Object.keys(updates).length) throw new ValidationError('invalid updates properties length')
        if (updates.name && typeof updates.name !== 'string') throw new ValidationError('invalid name type')
        if (updates.day && typeof updates.day !== 'string') throw new ValidationError('invalid day type')
        if (updates.time && typeof updates.time !== 'string') throw new ValidationError('invalid time type')
        if (updates.location && typeof updates.location !== 'string') throw new ValidationError('invalid location type')
        if (updates.group && typeof updates.group !== 'string') throw new ValidationError('invalid group type')
    },

    query(query) {
        if (typeof query !== 'string') throw new ValidationError('invalid query type')
        if (!query.length) throw new ValidationError('invalid query length')
    }
}