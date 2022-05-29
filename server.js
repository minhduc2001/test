const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const routes = require('./routes/route')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan("dev"))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

routes(app);

const port = process.env.PORT || 8080


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})