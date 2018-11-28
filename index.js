const { send, json } = require('micro')
const { get, post, put, del, router } = require('microrouter')
const monk = require('monk')
const cors = require('micro-cors')()
const db = require('./dbconfig')

const video = db.get('vidmodels')
db.then(() => {
    console.log('Connected to the server my dude...')
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
    result = result.filter(video => {
        return video.video_title.replace(/\s/g, "").toLowerCase().includes(req.params.name.toLowerCase())
    })
    if (result){
        send(res, 200, result) 
    }
    else {
        send(res, 404, {})
    }
}

// [POST] /video 200{} Create a Video
const createVideo = async (req, res) => {
    const body = await json(req)
    const result = await video.insert( body ).then(results => (results))
    send(res, 200, result)
}

// [PUT] /video/id/:id 200{} Update Video
const updateVideo = async (req, res) => {
    const result = await video.update({ "_id": req.params.id }, body ).then(results => (results))
    send(res, 200, result)
}

// [DELETE] /video/id/:id 200{} Delete a Video
const deleteVideo = async (req, res) => {
    const result = await video.remove({ "_id": req.params.id }).then(results => (results))
    send(res, 200, result)
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