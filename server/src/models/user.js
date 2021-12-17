import mongoose from 'mongoose'
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
        Username: {
            type: String,
            required: true
        },
		Email: {
			type: String,
			required: true,
		},
		Password: {
			type: String,
            required: true,
		},
		Role: {
			type: String,
            default: "user"
		},
	},
)

const User = mongoose.model('User', userSchema)
function hashKode(password){
    return bcrypt.hashSync(password, 10)
}

async function addDataIfEmpty(){
    const db = await Wish.countDocuments({})
    if(db === 0 ){
     let testData = [
        {Username: "Cai", Email: "cai@c.com", Password: hashKode("kode123r"), Role: "admin"},
        {Username: "Mester", Email: "m@m.com", Password:hashKode("kode123")},
        {Username: "Duc", Email: "d@d.com", Password: hashKode("kode123")},
        
      ]
      Wish.insertMany(testData)
    }
  }
  addDataIfEmpty()

export default User
