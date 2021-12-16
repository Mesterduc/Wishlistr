import express from 'express'
import Wish from '../models/wish.js'
import jwt from 'jsonwebtoken'

function wishRouter() {
	const router = express.Router()
	// GET
	router.get('/wish', async (req, res) => {
		const wishes = await Wish.find().sort({ Position: 'desc' })
		res.json(wishes)
	})

	// Create
	router.post('/wish', async (req, res) => {
		try {
			const wish = await Wish.create(req.body)
			res.status(201)
			res.json(wish)
		} catch (error) {
			res.status(500)
			res.json({
				error: 'Wish could not be created',
				details: error.toString(),
			})
		}
	})

	// DELETE
	router.delete('/wish', async (req, res) => {
		// console.log(req.body)
		try {
			const wish = await Wish.findByIdAndDelete(req.body.id)
			if (wish) {
				res.json(wish)
			} else {
				res.status(404)
				res.json({ error: 'Wish not found' })
			}
		} catch (error) {
			res.status(500)
			res.json({ error: 'Something went wrong', details: error.toString() })
		}
	})

	// UPDATE
	router.put('/wish', async (req, res) => {
		try {
			// console.log(req.body.id)
			const wish =  await Wish.findByIdAndUpdate({_id: req.body.id}, {Title: req.body.Title, Description: req.body.Description, Link: req.body.Link},{ new: true })
			// console.log(wish)
			if (wish) {
				res.json(wish)
			} else {
				res.status(404)
				res.json({ error: 'Wish not found' })
			}
		} catch (error) {
			res.status(500)
			res.json({ error: 'Something went wrong', details: error.toString() })
		}
	})
	

	// UPDATE wish position
	router.put('/wish/:id/position', async (req, res) => {
		const wish = await Wish.findByIdAndUpdate(req.body.id, {"$inc": {Position: req.body.Position}},{ new: true })
		res.json(wish)
	})

	// UPDATE wish status
	router.put('/wish/:id/isGifted', async (req, res) => {
		const wish = await Wish.findByIdAndUpdate(req.body.id, {$set:{isGifted: req.body.Gifted}},{ new: true })
		res.json(wish)
	})

	// wish comment
	//create
	router.post('/wish/:id/comment', async (req, res) => {
		try {
			await Wish.findByIdAndUpdate(
				{ _id: req.body.id },
				{
					$push: {
						Comments: {
							Name: req.body.Name,
							Text: req.body.Text,
						},
					},
					$inc: { CommentCount: 1}

				}
			)
			const wish = await Wish.findByIdAndUpdate(
				{ _id: req.body.id },
				{
					$push: {
						Comments: {
							$each: [],
							$sort: { createdAt: -1 },
						},
					},
				},
				{ new: true }
			)
			res.status(201)
			res.json(wish)
		} catch (error) {
			res.status(500)
			res.json({
				error: 'Wish comment could not be created',
				details: error.toString(),
			})
		}
	})

	return router
}

export default wishRouter
