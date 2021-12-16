import { useEffect, useState } from 'react'
import { Router, navigate} from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
// import WishEdit from './Components/WishEdit'
// import Wish from './Components/Wish'
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
	}, [wishes])

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
		return wishes.find((wish) => wish._id === id)
	}
	async function postComment(id, name, text) {
		const data = {
			id: id,
			Name: name,
			Text: text,
		}
		const reply = await apiService.postComment(data)
		const hej = wishes.map((wish) => {
			if (wish._id === reply._id) {
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

  async function editWish(title, description, link, id){
    const data = {
      id: id,
      Title: title,
      Description: description,
      Link: link
    }
    const reply = await apiService.editWish(data)
		const newData = wishes.map((wish) => {
			if (wish._id === reply._id) {
				wish = reply
			}
			return wish
		})
		setWishes(newData)

  }

	return (
		<>
			<Navbar />
			<Router>
				<Wishes path='/' wishes={wishes}></Wishes>
				<WishView path='/wish/:id/*' gifted={gifted} editWish={editWish} getWish={getWish} postComment={postComment} deleteWish={deleteWish}>
          {/* <WishEdit path="edit" getWish={getWish} ></WishEdit> */}
        </WishView>
				<CreateWish path='/createWish' postWish={postWish}></CreateWish>
				<Login path='/login'></Login>
			</Router>
		</>
	)
}

export default App
