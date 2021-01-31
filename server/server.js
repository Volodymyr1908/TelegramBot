require("dotenv").config()
const base_url = "https://api.telegram.org/bot"
const  axios = require("axios")
const express = require('express')
const app = express()
const port = 3000

app.use(require("body-parser").json())

app.get('/', (req, res) => {
    // console.log(req.query);
    res.send(process.env.BOT_TOKEN)
})
app.post('/:token/setWebhook/', (req, res) => {
    if(req.params.token === process.env.BOT_TOKEN) {
        axios.post(base_url + process.env.BOT_TOKEN + "/setWebhook", {url: req.body.url})
            .then((r) => {
                res.send("Succes")
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send("Error")
            })
        } else {
            res.status(400).send("Wrong bot token!")
        }
})
app.post('/handler/', (req, res) => {
    console.log(req.body);
    res.send("Hello!")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
