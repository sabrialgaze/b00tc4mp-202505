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

    groupId(groupId) {
        if (typeof groupId !== 'string') throw new ValidationError('invalid groupId type')
    },

    dayOfWeek(dayOfWeek) {
        if (typeof dayOfWeek !== 'string') throw new ValidationError('invalid dayOfWeek type')
    },

    time(time) {
        if (typeof time !== 'string') throw new ValidationError('invalid time type')
    },

    coachId(coachId) {
        if (typeof coachId !== 'string') throw new ValidationError('invalid coachId type')
    },

    query(query) {
        if (typeof query !== 'string') throw new ValidationError('invalid query type')
        if (!query.length) throw new ValidationError('invalid query length')
    }
}