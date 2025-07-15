const express = require('express')
const cookieParser = require('cookie-parser')
const { logic } = require('./logic')

const server = express()

server.use(cookieParser())

let query

server.get('/', (request, response) => {
    response.send('Hello, World!')
})

server.get('/search', (request, response) => {
    const { q } = request.query

    query = q
    try {
        const cameras = logic.searchProducts(q)

        response.send(`<doctype html>
        <html>
            <head>
                <title>Results</title>
            </head>
            
            <body>
                <h2>Results</h2>
                <a href="http://localhost:8080/cart">Cart</a>
                <ul>
                    ${cameras.map(({ id, brand, model, type, filmFormat, price }) => `
                        <li>
                            <h3><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h3>
                        
                            <i>${type} ${filmFormat}</i>
                        
                            <strong>${price}</strong>
                        
                            <a href="http://localhost:8080/products/${id}/add">Add</a>
                        
                            <a href="http://${brand}.com">${brand}</a>
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

server.get('/products/:id/add', (request, response) => {
    const { id } = request.params

    try {
        const cart = logic.addProductToCart(id)
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

    console.debug(cart)

    response.redirect(`/search?q=${query}`)
})

server.get('/cart', (request, response) => {
    try {
        const items = logic.getCartProducts()

        response.send(`<doctype html>
        <html>
            <head>
                <title>Cart</title>
            </head>

            <body>
                <h2>Cart</h2>
                <a href="http://localhost:8080/search?q=${query}">Back</a>
                <ul>
                    ${items.map(({ id, brand, model, type, filmFormat, price }) => `<li>
                            <h3>${brand} ${model}</h3>

                            <i>${type} ${filmFormat}</i>

                            <strong>${price}</strong>

                            <a href="https://${brand}.com">${brand}</a>
                        </li>`).join('')}
                </ul>
                <strong>Total: ${items.reduce((acc, item) => acc + item.price, 0)}
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

server.get('/products/:id', (request, response) => {
    const { id } = request.params

    try {
        const item = logic.getProductInfo(id)

        const { brand, model, type, filmFormat, price, year, country, description, functionalities, commonUse, tags, salesStatsByCountry, images } = item

        const saleStatsKeys = Object.keys(salesStatsByCountry)

        response.send(`<doctype html>
        <html>
            <head>
                <title>${brand} ${model}</title>
            </head>
            
            <body>
                <article>
                    <h1><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h1>
                        
                            <i>${type} ${filmFormat}</i>
                        
                            <strong>${price}</strong>
                        
                            <a href="http://localhost:8080/products/${id}/add">Add</a>
                        
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
    const { tag } = request.params

    try {
        const filteredCameras = logic.filterProductsByTag(tag)

        response.send(`<doctype html>
        <html>
            <head>
                <title>Tag Results</title>
            </head>
            
            <body>
                <h2>Tag Results</h2>
                <a href="http://localhost:8080/cart">Cart</a>
                <ul>
                    ${filteredCameras.map(({ id, brand, model, type, filmFormat, price, tags }) => `
                        <li>
                            <h3><a href="http://localhost:8080/products/${id}"> ${brand} ${model}</a></h3>
                        
                            <i>${type} ${filmFormat}</i>
                        
                            <strong>${price}</strong>
                        
                            <a href="http://localhost:8080/products/${id}/add">Add</a>
                        
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
                <form action="/register/submit" method="get">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div>
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email"/>
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
                        <button type="reset">Clear</button>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </body>`)
})

server.get('/register/submit', (request, response) => {
    const { name, email, username, password } = request.query

    try {
        logic.registerUser(name, email, username, password)
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

    response.redirect('/login')
})

server.get('/login', (request, response) => {
    response.send(`<doctype html>
        <html>
            <head>
                <title>Login</title>
            </head>
            
            <body>
                <form action="/login/submit" method="get">
                    <div>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <button type="reset">Clear</button>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </body>`)
})

server.get('/login/submit', (request, response) => {
    const { username, password } = request.query
    try {
        const user = logic.loginUser(username, password)
        response.cookie('userId', user.id)
        response.send(`Welcome ${user.name}!`)
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