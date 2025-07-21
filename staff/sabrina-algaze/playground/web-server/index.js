const express = require('express')
const cookieParser = require('cookie-parser')
const { logic } = require('./logic')
const { helper } = require('./helper')

const server = express()

const formBodyParser = express.urlencoded()

server.use(cookieParser())

server.use(express.static('public'))

let query

server.get('/', (request, response) => {
    const { userId } = request.cookies

    if (!userId) {
        response.send(`<doctype html>
        <html>
            <head>
                <title>Landing</title>
            </head>
    
            <body>
                <h1>Landing</h1>
                    <p>
                        <a href="http://localhost:8080/register">Register</a> or <a href="http://localhost:8080/login">Login</a>
                    </p>
            </body>
        </html>`
        )
    } else {
        try {
            const user = logic.getUserInfo(userId)
            response.send(`<doctype html>
        <html>
            <head>
                <title>Home</title>
                <link href="style.css" rel="stylesheet" />
            </head>
    
            <body>
                <h1><a href="http://localhost:8080/">Home</a></h1>
                ${helper.renderWelcomeUser(user.name)}
                <form action="/logout" method="post">
                    ${helper.renderButton("submit", "Logout")}
                </form>
                <a href="http://localhost:8080/cart">Cart</a>
                <form action="/search" method="get">
                    <div>
                        ${helper.renderLabel("query", "Search")}
                        ${helper.renderInput("text", "query", "q", query)}
                    </div>
                       <div>
                       ${helper.renderButton("reset", "Clear")}
                       ${helper.renderButton("submit", "Search")}
                    </div>
                </form>
            </body>
        </html>`)
        } catch (error) {
            console.error(error)

            response.send(`<doctype html>
    <html>
        <head>
            <title>Error</title>
        </head>

        <body>
            <h1>Error</h1>
            <p>${error.message}</p>
        </body>
    </html>`)
        }
    }
})

server.post('/logout', (request, response) => {
    response.clearCookie('userId')
    response.redirect('/login')
})

server.get('/search', (request, response) => {
    try {
        const { userId } = request.cookies

        const { q } = request.query

        query = q
        const user = logic.getUserInfo(userId)

        const cameras = logic.searchProducts(q)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Results</title>
        </head>
        <body>
            <h1><a href="http://localhost:8080/">Home</a></h1>
            ${helper.renderWelcomeUser(user.name)}
            <form action="/logout" method="post">
                    ${helper.renderButton("submit", "Logout")}
                </form>
            <a href="http://localhost:8080/cart">Cart</a>
            <form action="/search" method="get">
                <div>
                    ${helper.renderLabel("query", "Search")}
                    ${helper.renderInput("text", "query", "q", query)}
                </div>
                    <div>
                    ${helper.renderButton("reset", "Clear")}
                    ${helper.renderButton("submit", "Search")}
                </div>
            </form>
            <h2>Results</h2>
            <ul>
                ${cameras.map(camera => `
                        <li>
                            ${helper.renderProductItem(camera)}
                        </li>`).join('')}
            </ul>
        </body>
    </html>`)
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Error</title>
        </head>

        <body>
            <h1>Error</h1>
            <p>${error.message}</p>
        </body>
    </html>`)
    }

})

server.post('/products/:productId/add', (request, response) => {
    const { userId } = request.cookies
    const { productId } = request.params

    try {
        logic.addProductToCart(userId, productId)

        response.redirect(`/search?q=${query}`)
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Error</title>
        </head>

        <body>
            <h1>Error</h1>
            <p>${error.message}</p>
        </body>
    </html>`)
    }
})

server.get('/cart', (request, response) => {
    try {
        const { userId } = request.cookies
        const user = logic.getUserInfo(userId)
        const items = logic.getCartProducts(userId)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Cart</title>
        </head>

        <body>
            <h1><a href="http://localhost:8080/">Home</a></h1>
            ${helper.renderWelcomeUser(user.name)}
            <form action="/logout" method="post">
                    ${helper.renderButton("submit", "Logout")}
                </form>
            <a href="http://localhost:8080/cart">Cart</a>
            <form action="/search" method="get">
                <div>
                    ${helper.renderLabel("query", "Search")}
                    ${helper.renderInput("text", "query", "q", query)}
                </div>
                    <div>
                    ${helper.renderButton("reset", "Clear")}
                    ${helper.renderButton("submit", "Search")}
                </div>
            </form>
            <h2>Cart</h2>
            <ul>
                ${items.map(camera => `<li>
                    ${helper.renderProductItem(camera, true)}
                </li>`).join('')}
            </ul>
            <strong>Total: ${items.reduce((acc, item) => acc + item.price, 0)}
            <div><a href="http://localhost:8080/search?q=${query}">Back</a></div>
        </body>
    </html>`)
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Error</title>
        </head>

        <body>
            <h1>Error</h1>
            <p>${error.message}</p>
        </body>
    </html>`)
    }
})

server.post('/products/:productId/remove', (request, response) => {
    const { userId } = request.cookies
    const { productId } = request.params

    try {
        logic.removeProductFromCart(userId, productId)

        response.redirect('/cart')
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
    <html>
        <head>
            <title>Error</title>
        </head>

        <body>
            <h1>Error</h1>
            <p>${error.message}</p>
        </body>
    </html>`)
    }
})

server.get('/products/:id', (request, response) => {
    try {
        const { id } = request.params
        const { userId } = request.cookies
        const user = logic.getUserInfo(userId)
        const item = logic.getProductInfo(id)

        const { brand, model, type, filmFormat, price, year, country, description, functionalities, commonUse, tags, salesStatsByCountry, images } = item

        const saleStatsKeys = Object.keys(salesStatsByCountry)

        response.send(`<doctype html>
    <html>
        <head>
            <title>${brand} ${model}</title>
        </head>

        <body>
            <h1><a href="http://localhost:8080/">Home</a></h1>
            ${helper.renderWelcomeUser(user.name)}
            <form action="/logout" method="post">
                    ${helper.renderButton("submit", "Logout")}
                </form>
            <a href="http://localhost:8080/cart">Cart</a>
            <form action="/search" method="get">
                <div>
                    ${helper.renderLabel("query", "Search")}
                    ${helper.renderInput("text", "query", "q", query)}
                </div>
                    <div>
                    ${helper.renderButton("reset", "Clear")}
                    ${helper.renderButton("submit", "Search")}
                </div>
            </form>
            <article>
                <h2><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h2>

                <i>${type} ${filmFormat}</i>

                <strong>${price}</strong>

                <form action="/products/${id}/add" method="post">
                    ${helper.renderButton("submit", "Add")}
                </form>

                <a href="http://${brand}.com">${brand}</a>

                <p>Year: ${year}</p>
                <p>Country: ${country}</p>
                <p>Description: ${description}</p>
                <p>Funcionalities: ${functionalities}</p>
                <p>Common use: ${commonUse}</p>
                <p>Tags:
                    ${tags.map(tag => `<a href="http://localhost:8080/products/tags/${tag}">${tag}</a>`).join(' ')}
                </p>
                <p>Sales stats by country: <ul>${saleStatsKeys.map(key => `<li>${key}: ${salesStatsByCountry[key]}</li>`).join('')}</ul></p>
                <p>Images: <ul>${images.map(image => `<li><img src="${image}" /></li>`).join('')}</ul>
                </p>
            </article>
        </body>`)
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
            <html>
                <head>
                    <title>Error</title>
                </head>

                <body>
                    <h1>Error</h1>
                    <p>${error.message}</p>
                </body>
            </html>`)
    }
})

server.get('/products/tags/:tag', (request, response) => {
    try {
        const { userId } = request.cookies
        const user = logic.getUserInfo(userId)
        const { tag } = request.params
        const filteredCameras = logic.filterProductsByTag(tag)

        response.send(`<doctype html>
                <html>
                    <head>
                        <title>Tag Results</title>
                    </head>

                    <body>
                        <h1><a href="http://localhost:8080/">Home</a></h1>
                        ${helper.renderWelcomeUser(user.name)}
                        <form action="/logout" method="post">
                                ${helper.renderButton("submit", "Logout")}
                            </form>
                        <a href="http://localhost:8080/cart">Cart</a>
                        <form action="/search" method="get">
                            <div>
                                ${helper.renderLabel("query", "Search")}
                                ${helper.renderInput("text", "query", "q", query)}
                            </div>
                                <div>
                                    ${helper.renderButton("reset", "Clear")}
                                    ${helper.renderButton("submit", "Search")}
                            </div>
                        </form>
                        <h2>Tag Results</h2>
                        <a href="http://localhost:8080/cart">Cart</a>
                        <ul>
                            ${filteredCameras.map(({ id, brand, model, type, filmFormat, price, tags }) => `
                        <li>
                            <h3><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h3>
                        
                            <i>${type} ${filmFormat}</i>
                        
                            <strong>${price}</strong>
                        
                            <form action="/products/${id}/add" method="post">
                                ${helper.renderButton("submit", "Add")}
                            </form>
                        
                            <a href="http://${brand}.com">${brand}</a>

                            <p>Tags:
                                ${tags.map(tag => `<a href="http://localhost:8080/products/tags/${tag}">${tag}</a>`).join(' ')}
                            </p>
                        </li>`).join('')}
                        </ul>
                    </body>
                </html>`)
    } catch (error) {
        console.error(error)
        response.send(`<doctype html>
                    <html>
                        <head>
                            <title>Error</title>
                        </head>

                        <body>
                            <h1>Error</h1>
                            <p>${error.message}</p>
                        </body>
                    </html>`)
    }
})

server.get('/register', (request, response) => {
    response.send(`<doctype html>
        <html>
            <head>
                <title>Register</title>
            </head>
            
            <body>
                <form action="/register/submit" method="post">
                    <div>
                        ${helper.renderLabel("name", "Name")}
                        ${helper.renderInput("text", "name", "name")}
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div>
                        ${helper.renderLabel("email", "E-mail")}
                        ${helper.renderInput("email", "email", "email")}
                    </div>
                    <div>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        ${helper.renderButton("reset", "Clear")}
                        ${helper.renderButton("submit", "Register")}
                    </div>
                </form>
                <a href="http://localhost:8080/login">Login</a>
            </body>`)
})

server.post('/register/submit', formBodyParser, (request, response) => {
    const { name, email, username, password } = request.body

    try {
        logic.registerUser(name, email, username, password)

        response.redirect('/login')
    } catch (error) {
        console.error(error)
        response.send(`<doctype html>
                        <html>
                            <head>
                                <title>Error</title>
                            </head>

                            <body>
                                <h1>Error</h1>
                                <p>${error.message}</p>
                            </body>
                        </html>`)
    }
})

server.get('/login', (request, response) => {
    response.send(`<doctype html>
        <html>
            <head>
                <title>Login</title>
            </head>
            
            <body>
                <form action="/login/submit" method="post">
                    <div>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        ${helper.renderButton("reset", "Clear")}
                        ${helper.renderButton("submit", "Login")}
                    </div>
                </form>
                <a href="http://localhost:8080/register">Register</a>
            </body>`)
})

server.post('/login/submit', formBodyParser, (request, response) => {
    const { username, password } = request.body
    try {
        const user = logic.loginUser(username, password)
        response.cookie('userId', user.id)
        response.redirect('/')
    } catch (error) {
        console.error(error)

        response.send(`<doctype html>
                            <html>
                                <head>
                                    <title>Error</title>
                                </head>

                                <body>
                                    <h1>Error</h1>
                                    <p>${error.message}</p>
                                </body>
                            </html>`)
    }
})

server.listen(8080, () => console.log('Server is up on port 8080'))