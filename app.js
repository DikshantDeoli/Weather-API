const bodyParser = require('body-parser');
const { json } = require('body-parser');
const express = require('express')
const https = require('https')
const PORT = process.env.PORT || 3000
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('dotenv').config()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post('/weather', (req, res) => {
    const location = req.body.location
    const unit = req.body.unit
    const apiID = process.env.API_KEY
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiID + "&q=" + location + "&units=" + unit
    https.get(url, (response) => {
        response.on('data', (d) => {
            const obj = JSON.parse(d);
            res.json(obj)
        })
    })
})

app.get

app.listen(PORT, () => {
    console.log("Sever is running on port 3000");
})