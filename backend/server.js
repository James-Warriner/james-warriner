
//dependencies
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//routes
const routes = require('./routes/routes')

const port = process.env.PORT
const allowed_url = process.env.FRONTEND_URL

const cors_options = {
    origin: allowed_url,
    optionSuccessStatus:200
}

app.use(cors(cors_options))

app.use('/api/',routes)


app.use((req,res)=>{res.status(404).json({error:'Not Found, keep looking!'})})

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});