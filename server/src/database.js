import mongoose from 'mongoose'
import MongoClient from 'mongodb'
import env from "dotenv"
env.config()

async function connectDatabase() {
	const connectionString = process.env.MONGODB_URL

	if (!connectionString) {
        throw new Error('MONGODB_URL not set as environment variable. Please configure it in an .env file.')
	}

	const client = new MongoClient.MongoClient(connectionString)

	try {
		await client.connect()
		console.log('Connected to server')
		return mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	} catch {
		console.log('failled to Connected to database')
	}
}

export default connectDatabase
