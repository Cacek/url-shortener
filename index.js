const express = require('express')
const dotenv = require('dotenv')
const Url = require('./routes/url.js')
const connectDB = require('./config/db')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

app.get('/', (req, res) => {
        res.send({msg: 'API Server is running....'})
      })
//})

//app.use(`process.env.API_URI`, Url)
app.use(`/api/v1/url`, Url)

app.listen(PORT, () => console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`))