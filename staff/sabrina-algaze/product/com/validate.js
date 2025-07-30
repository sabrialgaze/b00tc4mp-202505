import { ValidationError } from "./errors"
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

    username(username) {
        if (typeof username !== 'string') throw new ValidationError('invalid username')
        if (!username.length) throw new ValidationError('invalid username length')

        const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
        if (!usernameRegex.test(username)) throw new ValidationError('invalid username format')
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

    postId(postId) {
        if (typeof postId !== 'string') throw new ValidationError('invalid postId type')
    },

    image(image) {
        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!image.length) throw new ValidationError('No image was provided')
    },

    text(text) {
        if (typeof text !== 'string') throw new ValidationError('invalid text type')
        if (!text.length) throw new ValidationError('No text was provided')
    }
}