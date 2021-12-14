import { useEffect, useState } from 'react'
import { Router, navigate } from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
import Wishes from './views/Wishes/Wishes'
import Wish from './views/Wish/Wish'
import Login from './views/Login/Login'
const API_URL = process.env.REACT_APP_API

function App() {
	const [wishes, setWishes] = useState([])
	useEffect(() => {
		async function getData() {
			const url = `${API_URL}/wish`
			const response = await fetch(url)
			const data = await response.json()
			setWishes(data)
		}
		getData()
	}, [])

	async function postWish(title, link, description) {
		const data = {
			Title: title,
			Link: link,
			Description: description,
		}
		const url = `${API_URL}/wish/`
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const reply = await response.json()
    setWishes([ reply, ...wishes])
		if (!response.ok) {
			throw reply
		}else {
      navigate("/")
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
		const url = `${API_URL}/wish/:id/comment`
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const reply = await response.json()
    console.log(reply)
    const hej = wishes.map(wish => {
      if(wish._id == reply._id){
        wish = reply
      }
      return wish
    })
    // console.log(hej)
    setWishes(hej)
		if (!response.ok) {
			throw reply
		}
   
	}
  
	
// console.log(wishes)

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
