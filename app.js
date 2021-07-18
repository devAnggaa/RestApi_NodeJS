const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ 
    extended:true 
}))

const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : true
    })
    .then(()=>{
        console.log('Database Connected')
    })
    .catch((err)=>{
        console.log('Cannot connect to database!', err)
        process.exit()
    })

app.get(`/`, (req, res) => {
    res.send("Application running")
})
 
require('./app/routes/post.routes')(app)
require('./app/routes/auth.routes')(app)
// Kafka Consumer can be implemented successfully on local
// But need the public access endpoint
// So, for Heroku implementation i close the command and run it on different node :)
// require('./kafka/consumer')

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

