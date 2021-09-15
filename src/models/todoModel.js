import mongoose from 'mongoose'

const todoSchema = mongoose.Schema(
    {
        title : {
            type: String,
            required : true
        },
        description: {
            type: String,
        },
        status:{
            type: Boolean
        },
        groupId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Groups"
        }
    },
    {
        timestamps: true,
    }
)

const Todos = mongoose.model("Todos", todoSchema)

export default Todos