const express = require('express')
const app = express()

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

app.get(/(.*)/, (req, res) => {
    res.send(`I don't know that path!`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})