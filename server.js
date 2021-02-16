const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const PORT = process.env.PORT || 3000
const api = require('./routes/api')
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use('/api', api)
app.get('/hello', function(req, res){
    res.send('Hello from NodeJS Server on Heroku with Angular')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})