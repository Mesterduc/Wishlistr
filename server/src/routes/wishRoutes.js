import express from 'express'
import Wish from '../models/wish.js'
import jwt from 'jsonwebtoken'

function wishRouter() {
	const router = express.Router()
	// GET
	router.get('/wish', async (req, res) => {
		const wishes = await Wish.find().sort({ createdAt: 'desc' })
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
		console.log(req.body)
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
	// TODO
	router.put('/wish', async (req, res) => {
		try {
			if (quote) {
				res.json(quote)
			} else {
				res.status(404)
				res.json({ error: 'Wish not found' })
			}
		} catch (error) {
			res.status(500)
			res.json({ error: 'Something went wrong', details: error.toString() })
		}
	})
	

	// selected wish
	// GET
	router.get('/wish/:id', async (req, res) => {
		console.log(req.params.id)
		const wish = await Wish.findById(req.params.id)
		res.json(wish)
	})
	// Create
	// UPDATE
	router.put('/wish/:id', async (req, res) => {
		// console.log(req.body.Gifted)
		const wish = await Wish.findByIdAndUpdate(req.body.id, {"$set":{"isGifted": req.body.Gifted}},{ new: true })
		console.log(wish)
		res.json(wish)
	})
	// DELETE

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
