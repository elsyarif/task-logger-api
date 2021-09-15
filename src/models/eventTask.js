import mongoose from 'mongoose'

const eventTaskScheme = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        }, 
        description: {
            type: String,
        }, 
        status: {
            type: Boolean
        },
        tasks: [
            {
                title:{
                    type: String
                },
                status: {
                    type: Boolean
                },
                sart_date: {
                    type: Date
                }, 
                end_date: {
                    type: Date
                },
            }
        ],
        groupId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Groups"
        }
    },
    {timestamps: true,}
)

const EventTask = mongoose.model("Event_Task", eventTaskScheme)

export default EventTask