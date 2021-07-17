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

exports.create = (req, res) =>{
    const post = new Post({
        userName: req.body.userName, 
        accountNumber:req.body.accountNumber, 
        emailAddress:req.body.emailAddress, 
        identifyNumber:req.body.identifyNumber
    })

    post.save(post)
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        res.status(409).send({
            message : err.message || "Error while create"
        })
    })
}

exports.findId = (req, res) =>{
    const id = req.params.id

    Post.findById(id)
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

exports.findIdentifyNumber = (req, res) =>{
    const identifyNumber = req.params.identifyNumber

    Post.find({
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

exports.findAccountNumber = (req, res) =>{
    const accountNumber  = req.params.accountNumber 

    Post.find({
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

exports.update = (req, res) =>{
    const id = req.params.id

    Post.findByIdAndUpdate(id, req.body)
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

exports.delete = (req, res) =>{
    const id = req.params.id

    Post.findByIdAndRemove(id)
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

