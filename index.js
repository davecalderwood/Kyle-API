const { send } = require('micro')
const { get, post, put, del, router } = require('microrouter')
const monk = require('monk')
const cors = require('micro-cors')()
const db = require('./dbconfig')

const video = db.get('vidmodels')
db.then(() => {
    console.log('Connected to the server')
})

const getHome = async (req,res) => {
    send(res, 200, 'Home Page')
}

// [GET] /video 200[] Get all of the Videos
const getVideo = async (req, res) => {
    const result = await video.find({}).then( results => ( results ))
    // console.log(res)
    send(res, 200, result)
} 

// [GET] /video/name/:name 200[] Get Video by Name
const getVideoByName = async (req, res) => {
    let result = await video.find({}).then(results => (results))
    result = result.filter(video => video.video_title.toLowerCase().includes(req.params.name.toLowerCase()))
    send(res, 200, result)
}

// [POST] /video 200{} Create a Video
const createVideo = async (req, res) => {
    const result = await video.find({}).then(results => (results))
    send(res, 200, `Create the Video with ${req.body}`)
}

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
module.exports = cors (
    router(
        get('/', getHome),
        get('/video', getVideo),
        get('/video/name/:name', getVideoByName),
        post('/video', createVideo),
        put('/video/id/:id', updateVideo),
        del('/video/id/:id', deleteVideo) 
    )
)