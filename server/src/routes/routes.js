import express from 'express'
import Wish from '../models/wish.js'

function createRouter() {
	const router = express.Router()

	// wish
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
	// UPDATE
	router.put('/wish', async (req, res) => {
		try {
			// const quote = await Quote.findByIdAndUpdate( {_id: req.body.id}, { $inc: { likes: req.body.number }} );
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
	// DELETE
	router.delete('/wish', async (req, res) => {
		try {
			// const quote = await Quote.findByIdAndUpdate( {_id: req.body.id}, { $inc: { likes: req.body.number }} );
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

	// selected wish
	// GET
	router.get('/wish/:id', async (req, res) => {
		const wish = await Wish.findById(req.params.id)
		res.json(wish)
	})
	// Create
	// UPDATE
	// DELETE

	// wish comment
	//create
	router.post('/wish/:id/comment', async (req, res) => {
		try {
      await Wish.findByIdAndUpdate({_id: req.body.id}, { $push: { 
        Comments: { 
          Name: req.body.Name,
          Text: req.body.Text,
        }
      }
      })
      const wish = await Wish.findByIdAndUpdate({_id: req.body.id}, { $push: { 
        Comments: { 
          $each:[],
          $sort: {"createdAt": -1}
        }
      }
      }, {new: true})
      res.status(201);
      res.json(wish);
    } catch (error) {
      res.status(500);
      res.json({
        error: "Wish comment could not be created",
        details: error.toString(),
      });
    }
	})


	return router
}

export default createRouter
