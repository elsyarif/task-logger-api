import mongoose from 'mongoose'

const NotifScheme = mongoose.Scheme(
	{
		content: {
			type: String,
            required : true
		},
		action: {
			type: String,
            required : true
		},
		isRead: {
			type: Boolean
		},
		userCreate: {
			type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users"
		},
		createTime: {
			type: Date
		}
	},
	{
		 timestamps: true,
	}
)

const Notif = mongoose.model("Notif", NotifScheme)

export default Notif