const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

// app.use((req, res) => {
//     console.log('We got a new request')
//     res.send({ color: 'red' })
// })

app.get('/', (req, res) => {
    res.send('This is the home page')
})

// path parameters (dynamic routes with patterns)

// app.get('/r/:subreddit', (req, res) => {
//     const { subreddit } = req.params
//     res.send(`Browsing the ${subreddit} subreddit`)
// })

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params
    res.send(`Viewing post ID: ${postId} on the ${subreddit} subreddit`)
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

app.get('/search', (req, res) => {
    // console.log(req.query)
    // res.send('Hi')
    const { q } = req.query
    if (!q) res.send('Nothing found if nothing searched')
    res.send(`<h1>Search results for: ${q}`)
})

// route that sets a cookie
app.get('/set-cookie', (request, response) => {
    response.cookie('name', 'Sabrina')
    response.send('Cookie sent')
})

// route that reads the cookie
app.get('/read-cookie', (request, response) => {
    const { name } = request.cookies
    response.send(`Your cookie says: ${name}`)
})

// route that deletes the cookie
app.get('/delete-cookie', (request, response) => {
    response.clearCookie('name')
    response.send('Cookie deleted')
})

app.get(/(.*)/, (req, res) => {
    res.send(`I don't know that path!`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})