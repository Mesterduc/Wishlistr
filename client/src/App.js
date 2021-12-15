import { useEffect, useState } from 'react'
import { Router, navigate } from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
import Wishes from './views/Wishes/Wishes'
import Wish from './views/Wish/Wish'
import Login from './views/Login/Login'
import apiService from './apiService'
// const API_URL = process.env.REACT_APP_API

function App() {
	const [wishes, setWishes] = useState([])
	useEffect(() => {
		async function getData() {
			const response = await apiService.getWishes()
			setWishes(response)
		}
		getData()
	}, [])

	async function postWish(title, link, description) {
		const data = {
			Title: title,
			Link: link,
			Description: description,
		}
		try {
			const reply = await apiService.postWish(data)
			setWishes([reply, ...wishes])
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	function getWish(id) {
		return wishes.find((wish) => wish._id == id)
	}
	async function postComment(id, name, text) {
		const data = {
			id: id,
			Name: name,
			Text: text,
		}
		const reply = await apiService.postComment(data)
		console.log(reply)
		const hej = wishes.map((wish) => {
			if (wish._id == reply._id) {
				wish = reply
			}
			return wish
		})
		setWishes(hej)
	}

	return (
		<>
			<Navbar />
			<Router>
				<Wishes path='/' wishes={wishes}></Wishes>
				<Wish path='/wish/:id' getWish={getWish} postComment={postComment}></Wish>
				<CreateWish path='/createWish' postWish={postWish}></CreateWish>
				<Login path='/login'></Login>
			</Router>
		</>
	)
}

export default App
