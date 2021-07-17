const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation} = require('../../config/validation.config')
const db = require('../models')
const Auth = db.auth

exports.registerToken = async (req, res) =>{
    const user = req.body.user
    const password = req.body.password

    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // if user exist
    const userExist = await Auth.findOne({user: user})
    if(userExist) return res.status(400).json({
        status: res.statusCode,
        message: 'User already taken !'
    })
    
    //Hash
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const auth = new Auth({
        user: user,
        password: hashPassword 
    })

    //create auth
    await auth.save(auth)
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while create"
        })
    })
}

exports.getToken = async (req, res) =>{
    const auth = await Auth.findOne({user: req.body.user})
    if(!auth) return res.status(400).json({
        status: res.statusCode,
        message: 'Invalid User Auth!'
    })

    const validPwd = await bcrypt.compare(req.body.password, auth.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Incorrect Password!'
    })

    const token = jwt.sign({ _id: auth._id }, 'test')
    res.header('auth-token', token).json({
        token: token
    })
}