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
		Position: {
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

async function hej(){
  const db = await Wish.countDocuments({})
  if(db === 0 ){
   let testData = [
      {Title: "Cykel", Description: "I Wish a bicycle from E-FLY", Link: "www.cykelgear.dk/cykler/elcykler/e-fly-nova-max-iv-n7-centermotor-bla", CommentCount: 1, Comments: [{Text: "What color", Name: "hong"}]},
      {Title: "Cap", Description: "Colorful cap for the winter", Link: "boozt.com", CommentCount: 2, Comments: [{Text: "What color do you like", Name: "Ip"}, {Text: "What size do you use?", Name: "Ole"}]},
      {Title: "Bed", Description: "A big comfortable bed", Link: "www.sengeexperten.dk", CommentCount: 1, Comments: [{Text: "What size should the be?", Name: "Morten"}]},
      {Title: "Apple airpods pro", Description: "For listen to musix", Link: "apple.com", CommentCount: 1, Comments: [{Text: "The pro or is the airpods good enongh", Name: "Emil"}]},
      {Title: "Computer", Description: "A computer with the new grafic card GTX 3080", CommentCount: 1, Link: "elgiganten.dk", Comments: [{Text: "What abort the CPU", Name: "Ida"}]},
      {Title: "Gaming Headset", Description: "Headset for gaming", Link: "elgiganten.dk", Comments: []},
      {Title: "Mice", Description: "Small mice for traveling", Link: "power.dk", CommentCount: 1, Comments: [{Text: "Wires or wireless", Name: "Line"}]},
      {Title: "Razerblade", Description: "Sharp razerblades for my face", Link: "elgiganten.dk", CommentCount: 1, Comments: [{Text: "For which brand", Name: "Hong"}]},
      {Title: "Food boxes", Description: "Vegan food box", Link: "www.hellofresh.dk", CommentCount: 1, Comments: [{Text: "How many days a week do you want?", Name: "Cai"}]},
      {Title: "Smart light", Description: "Smart light that works with the iphone", Link: "power.dk", Comments: []},
    ]
    Wish.insertMany(testData)
  }
}
hej()

export default Wish
