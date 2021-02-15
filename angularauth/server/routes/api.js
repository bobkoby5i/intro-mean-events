const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = process.env.MONGO_URL || "mongodb://localhost:27017/eventsdb";
//const db = "mongodb+srv://<user>:<password>@koby5icluster01-tlx1x.mongodb.net/admin?retryWrites=true&w=majority"
//console.log(db)

mongoose.connect(db, err=> {
    if (err) {

        console.error('Error' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if (!req.headers.authorization) {   // no header
        return res.status(401).send('Unauthorized request - no header')
    } 
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request - null Bearer token')
    }
    let payload = jwt.verify(token, 'my_encryption_password')
    if (!payload) {
        return res.status(401).send('Unauthorized request - token verification failed')
    }
    req.userId = payload.subject // this is mongo id of that documentwith user
    next()
}

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

router.get('/special', verifyToken, (req,res) => {
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