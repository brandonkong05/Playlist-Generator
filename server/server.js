import express, { response } from 'express'
import cors from 'cors';

const app = express()
const port = 5000

// CORS middleware to allow our server to receive requests from any URL source.
app.use(cors())

// We will expect JSON data as the common format used to receive/send data to/from this server.
// i.e. incoming requests will have header Content-Type as application/json, and server will respond with JSON response.
app.use(express.json())

app.get('/', (req, res) => {
    res.json('ExpressJS server response OK!')
})

app.listen(port, () => {
    console.log(`ExpressJS server listening on PORT: ${port}`)
})
