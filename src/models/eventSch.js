import mongoose from 'mongoose'

const eventSchScheme = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        }, 
        description: {
            type: String,
        }, 
        start_date: {
            type: Date
        }, 
        end_date: {
            type: Date
        },
        groupId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Groups"
        }
    },
    {timestamps: true,}
)

const EventSch = mongoose.model("Event_Schedule", eventSchScheme)

export default EventSch