import mongoose from 'mongoose'

const wishesSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Description: {
			type: String,
		},
		Link: {
			type: String,
		},
		CommentCount: {
			type: Number,
			default: 0,
		},
    isGifted: {
      type: Boolean,
      default: false,
    },
		Comments: [
			{
				type: new mongoose.Schema(
					{
						Text: {
							type: String,
							required: true,
						},
						Name: {
							type: String,
							required: true,
						},
					},
					{
						timestamps: true,
					}
				),
			},
		],
	},
	{
		timestamps: true,
	}
)

const Wish = mongoose.model('Wish', wishesSchema)

export default Wish
