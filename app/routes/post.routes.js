module.exports = (app) =>{
    const posts = require('../controllers/post.controller')
    const router = require('express').Router()

    router.get('/', posts.findAll)
    router.post('/', posts.create)
    router.get('/:id', posts.findId)
    router.put('/:id', posts.update)
    router.delete('/:id', posts.delete)
    router.get('/id/:identifyNumber', posts.findIdentifyNumber)
    router.get('/acc/:accountNumber', posts.findAccountNumber)

    app.use('/api/posts', router)
}