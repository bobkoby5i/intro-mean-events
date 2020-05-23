const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/eventsdb"
//const db = "mongodb+srv://{user}:{password}@koby5icluster01-tlx1x.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db, err=> {
    if (err) {

        console.error('Error' + err)
    } else {
        console.log('Connected to mongodb')
    }
})


router.get('/', (req, res) => {
    res.send('From API route')
})


module.exports = router