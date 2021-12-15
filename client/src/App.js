import { useEffect, useState } from 'react'
import { Router, navigate} from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
import Wish from './Components/Wish'
import Wishes from './views/Wishes/Wishes'
import WishView from './views/Wish/Wish'
import Login from './views/Login/Login'
import apiService from './apiService'

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

	async function gifted(id, gifted) {
    const data = {
			id: id,
      Gifted: gifted
		}
    const reply = await apiService.gifted(data)
		const newData = wishes.map((wish) => {
			if (wish._id === reply._id) {
				wish.isGifted = !wish.isGifted
			}
			return wish
		})
		setWishes(newData)
	}

  async function deleteWish(id){
    if(apiService.loggedIn()){
      const reply = await apiService.deleteWish({id})
      const newData = wishes.filter((wish) => wish._id !== reply._id)
      setWishes(newData)
      navigate("/")
    }else {
      alert("You need to be logged in, to delete this wish")
    }
  }

	return (
		<>
			<Navbar />
			<Router>
				<Wishes path='/' wishes={wishes}></Wishes>
				<WishView path='/wish/:id' gifted={gifted} getWish={getWish} postComment={postComment} deleteWish={deleteWish}></WishView>
				<CreateWish path='/createWish' postWish={postWish}></CreateWish>
				<Login path='/login'></Login>
			</Router>
		</>
	)
}

export default App
