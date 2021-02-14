const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
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


router.post('/register', (req, res) => {
    let userData = req.body
    let user =  new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }           // prepare payload
            let token = jwt.sign(payload, 'my_encryption_password') // symetric encription
            res.status(200).send({token})                           // respond with token 
        }
    }) 
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('email not recognised')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id }                       // user_id from DB
                    let token = jwt.sign(payload, 'my_encryption_password')   // sign
                    //res.status(200).send(user)
                    res.status(200).send({token})                            // send to FE
                }
            }
        }
    } )
})

router.get('/events', (req,res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        }        
    ]
    res.json(events)
})

router.get('/special', (req,res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.123Z"
        }        
    ]
    res.json(events)
})


module.exports = router