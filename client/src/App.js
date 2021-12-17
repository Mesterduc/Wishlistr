import { useEffect, useState } from 'react'
import { Router, navigate } from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
import SignUp from './views/Signup/SignUp'
import Wishes from './views/Wishes/Wishes'
import WishView from './views/Wish/Wish'
import Login from './views/Login/Login'
import apiService from './apiService'

function App() {
	const [wishes, setWishes] = useState([])
	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		const response = await apiService.getWishes()
		setWishes(response)
	}
	async function postWish(title, link, description) {
		const data = {
			Title: title,
			Link: link,
			Description: description,
		}
		try {
			const reply = await apiService.postWish(data)
			setWishes([...wishes, reply])
		} catch (error) {
			return error
		}
	}
	function getWish(id) {
		return wishes.find((wish) => wish._id === id)
	}
	async function postComment(id, name, text) {
		const data = {
			id: id,
			Name: name,
			Text: text,
		}
		try {
			const reply = await apiService.postComment(data)
			const newWishes = wishes.map((wish) => {
				if (wish._id === reply._id) {
					wish = reply
				}
				return wish
			})
			setWishes(newWishes)
		} catch (error) {
			return error
		}
	}

	async function gifted(id, gifted) {
		const data = {
			id: id,
			Gifted: gifted,
		}
		try {
			const reply = await apiService.gifted(data)
			const newData = wishes.map((wish) => {
				if (wish._id === reply._id) {
					wish.isGifted = !wish.isGifted
				}
				return wish
			})
			setWishes(newData)
		} catch (error) {
			return error
		}
	}

	async function deleteWish(id) {
		// if (apiService.loggedIn()) {
		try {
			const reply = await apiService.deleteWish({ id })
			const newData = wishes.filter((wish) => wish._id !== reply._id)
			setWishes(newData)
			navigate('/')
		} catch (error) {
			return error
		}
		// } else {
		// 	alert('You need to be logged in, to delete this wish')
		// }
	}

	async function editWish(title, description, link, id) {
		const data = {
			id: id,
			Title: title,
			Description: description,
			Link: link,
		}
		try {
		const reply = await apiService.editWish(data)
		const newData = wishes.map((wish) => {
			if (wish._id === reply._id) {
				wish = reply
			}
			return wish
		})
		setWishes(newData)
	} catch (error) {
		return error
	}
	}

	async function changePosition(id, position) {
		const data = {
			id: id,
			Position: position,
		}
		try{
		const reply = await apiService.changePosition(data)
		const newData = wishes.map((wish) => {
			if (wish._id === id) {
				wish.Position += position
			}
			return wish
		})
		const sorted = newData.sort((a, b) => (b.Position > a.Position ? 1 : b.Position > a.Position ? -1 : 0))
		setWishes(sorted)
	} catch (error) {
		return error
	}
	}

	return (
		<>
			<Navbar />
			<Router>
				<Wishes path='/' wishes={wishes} changePosition={changePosition}></Wishes>
				<WishView
					path='/wish/:id/*'
					gifted={gifted}
					editWish={editWish}
					getWish={getWish}
					postComment={postComment}
					deleteWish={deleteWish}
				></WishView>
				<CreateWish path='/createWish' postWish={postWish}></CreateWish>
				<Login path='/login'></Login>
				<SignUp path='/signUp'></SignUp>
			</Router>
		</>
		// move components into wishview /children
		// local storage 
	)
}

export default App
