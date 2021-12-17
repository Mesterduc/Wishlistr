import { useState } from 'react'
import apiService from '../apiService'

function CreateWish(props) {
	const { postWish } = props
	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')
	const [description, setDescription] = useState('')
	async function createWish() {
		if (apiService.loggedIn()) {
			if (title.length) {
				const msg = await postWish(title, link, description)
				if (!msg) {
					setTitle('')
					setLink('')
					setDescription('')
				}else {
					alert(msg)
				}
				// navigate('/')
			} else {
				// setError('Missing input')
				alert('You need a title for your wish')
			}
		} else {
			alert('You need to be logged in to create a wish')
		}
	}

	return (
		<>
			<article className='createWish'>
				<h1 className='createWish__header'>create wish</h1>
				<input
					className='createWish__input'
					placeholder='Title'
					onChange={(event) => {
						setTitle(event.target.value)
					}}
					value={title}
				></input>
				<input
					className='createWish__input'
					placeholder='Link'
					onChange={(event) => {
						setLink(event.target.value)
					}}
					value={link}
				></input>
				<textarea
					className='createWish__input'
					placeholder='Description'
					onChange={(event) => {
						setDescription(event.target.value)
					}}
					value={description}
					rows='5'
				></textarea>
				<button className='createWish__button' onClick={() => createWish()}>
					Create Wish
				</button>
			</article>
		</>
	)
}

export default CreateWish
