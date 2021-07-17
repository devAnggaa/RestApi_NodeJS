module.exports = (app) =>{
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()

    router.post('/login', auth.getToken)
    router.post('/register', auth.registerToken)

    app.use('/api/auth', router)
}