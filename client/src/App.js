import { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import Navbar from './Components/Navbar'
import CreateWish from './Components/CreateWish'
import Wishes from './views/Wishes/Wishes'
import Wish from './views/Wish/Wish'
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
function getWish(id){
  return wishes.find(wish  => wish._id = id)
}
// console.log(getWish())
	return (
		<>
			<Navbar />
			<Router>
				<Wishes path='/' wishes={wishes}></Wishes>
        <Wish path='/wish/:id' getWish={getWish}></Wish>
        <CreateWish path='/createWish'></CreateWish>
			</Router>
		</>
	)
}

export default App
