const { mongoose } = require(".")

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {   
            user:String,
            password:String
        }
    )

    const Auth = mongoose.model("auths", schema)
    return Auth
}