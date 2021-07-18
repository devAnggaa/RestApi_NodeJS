const verifyToken = require('./verify.routes')

module.exports = (app) =>{
    const posts = require('../controllers/post.controller')
    const router = require('express').Router()

    router.get('/', verifyToken, posts.findAll)
    router.post('/', verifyToken, posts.create)
    router.post('/consumer', post.create)
    router.get('/:id', verifyToken, posts.findId)
    router.put('/:id', verifyToken, posts.update)
    router.delete('/:id', verifyToken, posts.delete)
    router.get('/id/:identifyNumber', verifyToken, posts.findIdentifyNumber)
    router.get('/acc/:accountNumber', verifyToken, posts.findAccountNumber)

    app.use('/api/posts', router)
}