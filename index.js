const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')
require('dotenv').config()
// const router = express.Router()

app.listen(port, () => console.log(`Example app listening on port ${port}`))

// Connect to mLab 
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

// Error connecting to DB
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error"))

// Create method for adding videos
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });

// Create Schema
const videoSchema = new mongoose.Schema({
    VideoURL: String,
    VideoTitle: String,
    VideoDesc: String,
})

// Create Model
const VidModel = mongoose.model('VidModel', videoSchema)

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// [GET] /video 200[] Get all of the Videos
const getVideo = async (req, res) => {
    const result = await video.find({}).then( results => ( results ) )
    send(res, 200, result)
} 

// [GET] /video/name/:name 200[] Get Video by Name
const getVideoByName = async (req, res) => {
    let result = await video.find({}).then(results => (results))
    result = result.filter(video => video.name.toLowerCase().includes(req.params.name.toLowerCase()))
    send(res, 200, result)
}

// [POST] /video 200{} Create a Video
app.post('/video', (req, res) => {
    const VidData = new VidModel(req.body)
    VidData.save()
    .then(video => {
        res.send('Video saved to the database')
    })
    .catch(err => {
        res.status(400).send('Unable to save video to the database')
    })
})

// [PUT] /video/id/:id 200{} Update Video
const updateVideo = async (req, res) => {
    const result = await video.find({}).then(results => (results))
    send(res, 200, `Update the Video with ID ${req.params.id} using ${req.body}`)
}

// [DELETE] /video/id/:id 200{} Delete a Video
const deleteVideo = async (req, res) => {
    const result = await video.find({}).then(results => (results))
    send(res, 200, `Delete the Video with ID - ${req.params.id}`)
}

// Exports
module.exports = [
    get('/video', getVideo),
    get('/video/name/:name', getVideoByName),
    post('/video', createVideo),
    put('/video/id/:id', updateVideo),
    del('/video/id/:id', deleteVideo) 
]