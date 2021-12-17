import express from 'express'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

function userRouters(secret) {
	const router = express.Router()
	// User
	// Login user
	router.post('/user/auth', async (req, res) => {
		const email = req.body.email
        const password = req.body.password

		const user = await User.findOne({ Email: email })
		if (user) {
			const payload = { Email: email, Role: user.Role, Username: user.Username }
            if (bcrypt.compareSync(password, user.Password)) {
                // console.log(user.Password)
                const token = jwt.sign(payload, secret, {
                    algorithm: 'HS512',
                    expiresIn: '100h',
                })
                res.json({
                    msg: `User '${email}' authenticated successfully`,
                    role: user.Role,
                    username: user.Username,
                    token: token,
                })
            }
		} else {
			res.status(404).json({ msg: 'User not found!' })
		}
	})

	// POST user
	router.post('/user', async (req, res) => {
        const newPassword = bcrypt.hashSync(req.body.password, 10)
        const data = {
            Username: req.body.username,
            Email: req.body.email,
            Password: newPassword,
        }
		try {
			const user = await User.create(data)
			res.status(201)
			res.json(user)
		} catch (error) {
			res.status(500)
			res.json({
				error: 'User could not be created',
				details: error.toString(),
			})
		}
	})

	return router
}

export default userRouters
