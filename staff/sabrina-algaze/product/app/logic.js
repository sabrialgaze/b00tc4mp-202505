let logic

{
    const registerUser = (name, email, username, password) => {
        // TODO add regex validation
        if (typeof name !== 'string') throw new TypeError('invalid name')
        if (!name.length) throw new RangeError('invalid name length')

        if (typeof email !== 'string') throw new TypeError('invalid email')
        if (!email.length) throw new RangeError('invalid email length')

        if (typeof username !== 'string') throw new TypeError('invalid username')
        if (!username.length) throw new RangeError('invalid username length')

        if (typeof password !== 'string') throw new TypeError('invalid password')
        if (!password.length) throw new RangeError('invalid password length')


        const nameRegex = /^[a-zA-Z\s]+$/
        if (!nameRegex.test(name)) throw new Error('invalid name format')

        const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
        if (!emailRegex.test(email)) throw new Error('invalid email format')

        const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
        if (!usernameRegex.test(username)) throw new Error('invalid username format')

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (!passwordRegex.test(password)) throw new Error('invalid password format')


        const users = data.getUsers()

        let user = users.find(user => user.email === email || user.username === username)

        if (user) throw new Error('user already exists')

        const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

        user = { id, name, email, username, password }

        users.push(user)

        data.setUsers(users)
    }

    const loginUser = (username, password) => {
        // TODO add regex validations

        if (typeof username !== 'string') throw new TypeError('invalid username')
        if (!username.length) throw new RangeError('invalid username length')

        if (typeof password !== 'string') throw new TypeError('invalid password')
        if (!password.length) throw new RangeError('invalid password length')

        const users = data.getUsers()

        const user = users.find(user => user.username === username)

        if (!user) throw new Error('user not found')

        if (user.password !== password) throw new Error('wrong password')

        data.setUserId(user.id)
    }

    const getUserInfo = () => {
        const userId = data.getUserId()

        const users = data.getUsers()

        const user = users.find(user => user.id === userId)

        if (!user) throw Error('user not found')

        delete user.password

        return user
    }

    const isUserLoggedIn = () => !!data.getUserId()

    const logoutUser = () => data.removeUserId()


    const createPost = (image, text) => {
        // TODO store in data
        const userId = data.getUserId()

        const users = data.getUsers()

        const user = users.find(user => user.id === userId)

        if (!user) throw Error('user not found')


        const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

        const post = {
            id,
            author: userId,
            image,
            text,
            date: new Date().toISOString()
        }

        const posts = data.getPosts()

        posts.push(post)

        data.setPosts(posts)
        /*
        const userId = data.getUserId()

        //  search user, if not found, then error

        const user = ...

        const post = {
            id: ...,
            author: user.id,
            image,
            text,
            date: new Date().toISOString()
        }
         
        const posts = data.getPosts()

        posts.push(post)

        data.setPosts(posts)
        */
    }

    const getPosts = () => {
        // TODO read all posts from data
    }

    logic = {
        registerUser,
        loginUser,
        getUserInfo,
        isUserLoggedIn,
        logoutUser,

        createPost,
        getPosts
    }
}