import { useState } from 'react'
import apiService from '../apiService'

function CreateWish(props) {
    const {postWish} = props
	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')
	const [description, setDescription] = useState('')
    function createWish() {
		if(apiService.loggedIn()){
			if (title.length > 0) {
					postWish(title, link, description)
					setTitle('')
					setLink('')
					setDescription('')
			} else {
				// setError('Missing input')
				alert("You need a title for your wish")
			}
		}else {
			alert("You need to be logged in to create a wish")
		}
	}
    
	return (
		<>
			<article className="createWish">
				<p>create wish</p>
				<input
					placeholder='Title'
					onChange={(event) => {
						setTitle(event.target.value)
					}}
					value={title}
				></input>
				<input
					placeholder='Link'
					onChange={(event) => {
						setLink(event.target.value)
					}}
					value={link}
				></input>
				<textarea
					placeholder='Description'
					onChange={(event) => {
						setDescription(event.target.value)
					}}
					value={description}
					rows='5'
				></textarea>
                <button className="createWish__button" onClick={() => createWish()}>Create Wish</button>
			</article>
		</>
	)
}

export default CreateWish
