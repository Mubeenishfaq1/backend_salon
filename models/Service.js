const mongoose=require("mongoose")

const serviceSchema=mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    images:{
        type:String
    },
    description:{
        type:String
    }

})

const serviceModel=mongoose.model("Service",serviceSchema)

module.exports=serviceModel