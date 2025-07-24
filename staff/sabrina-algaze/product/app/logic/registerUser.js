/**
 * Registers a user.
 * 
 * @example
 ```js
// demo

registerUser('Sabrina2', 'sabrina2@mail.com', 'sabrina2', '123123123')
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
 ```
 * 
 * @param {string} name The user name.
 * @param {string} email The user email.
 * @param {string} username The user username.
 * @param {string} password The user password.
 */
export const registerUser = (name, email, username, password) => {
    if (typeof name !== 'string') throw new TypeError('invalid name')
    if (!name.length) throw new RangeError('invalid name length')

    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(name)) throw new Error('invalid name format')

    if (typeof email !== 'string') throw new TypeError('invalid email')
    if (!email.length) throw new RangeError('invalid email length')

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
    if (!emailRegex.test(email)) throw new Error('invalid email format')

    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
    if (!usernameRegex.test(username)) throw new Error('invalid username format')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!passwordRegex.test(password)) throw new Error('invalid password format')

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            username,
            password
        })
    })
        .catch(error => { throw new Error('connection error') })
        .then(res => {
            const { status } = res

            if (status === 201) return

            return res.json()
                .catch(error => { throw new Error('json error') })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}