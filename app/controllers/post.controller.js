const db = require('../models')
const Post = db.posts
const Auth = db.auth

exports.findAll = async (req, res) =>{

    await Post.find()
    .then((result) =>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "Error while retrieving data"
        })
    })
}

exports.create = async (req, res) =>{
    const post = new Post({
        userName: req.body.userName, 
        accountNumber:req.body.accountNumber, 
        emailAddress:req.body.emailAddress, 
        identifyNumber:req.body.identifyNumber
    })

    const isExist = await Post.findOne({identifyNumber:req.body.identifyNumber})
    if(isExist) return res.status(400).json({
        status: res.statusCode,
        message: `User already created with identify number ${req.body.identifyNumber}!`
    })

    await post.save(post)
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while create"
        })
    })
}

exports.findId = async (req, res) =>{
    const id = req.params.id

    await Post.findById(id)
    .then((result) =>{
        if(!result){
            res.status(404).send({
                message : `Cant find data by id : ${id}`
            })
        }

        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while find"
        })
    })
}

exports.findIdentifyNumber = async (req, res) =>{
    const identifyNumber = req.params.identifyNumber

    await Post.find({
        identifyNumber : identifyNumber
    })
    .then((result) =>{

        if(!result){
            res.status(404).send({
                message : `Cant find data by identifyNumber : ${identifyNumber}`
            })
        }

        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while find"
        })
    })
}

exports.findAccountNumber = async (req, res) =>{
    const accountNumber  = req.params.accountNumber 

    await Post.find({
        accountNumber  : accountNumber 
    })
    .then((result) =>{

        if(!result){
            res.status(404).send({
                message : `Cant find data by accountNumber  : ${accountNumber}`
            })
        }

        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while find"
        })
    })
}

exports.update = async (req, res) =>{
    const id = req.params.id

    await Post.findByIdAndUpdate(id, req.body)
    .then((result) =>{
        if(!result){
            res.status(404).send({
                message : "Data Not Found"
            })
        }

        res.send({
            message : "Success update data"
        })
    })
    .catch((err) =>{
        res.status(409).send({
            message: err.message || "Error while update"
        })
    })
}

exports.delete = async (req, res) =>{
    const id = req.params.id

    await Post.findByIdAndRemove(id)
    .then((result) =>{
        if(!result){
            res.status(404).send({
                message : "Data Not Found"
            })
        }
        
        res.send({
            message : "Success delete data"
        })
    })
    .catch((err) =>{
        res.status(409).send({
            message: err.message || "Error while delete"
        })
    })

}

