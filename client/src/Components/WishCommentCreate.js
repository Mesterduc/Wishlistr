import { useState } from 'react'
import apiService from '../apiService'
function WishCommentCreate(props) {
	const { id, postComment } = props

	const [name, setName] = useState('')
	const [text, setText] = useState('')
	const [error, setError] = useState('')

	async function comment() {
		if (name.length && name.length) {
			if (apiService.loggedIn()) {
				const msg = await postComment(id, name, text)
				if (!msg) {
					setName('')
					setText('')
					setError('')
				} else {
					alert(msg)
				}
			} else {
				alert('You need to be logged in to comment')
			}
		} else {
			setError('Field is empty')
		}
	}

	return (
		<section className='createComment'>
			<p className='createComment__error'>{error}</p>
			<div className='createComment__input-container'>
				<input
					className='createComment__input'
					type='text'
					placeholder='Name'
					value={name}
					onChange={(event) => setName(event.target.value)}
				></input>
				<input
					className='createComment__input'
					type='text'
					placeholder='Text'
					value={text}
					onChange={(event) => setText(event.target.value)}
				></input>
				<button className='createComment__button' type='button' onClick={() => comment()}>
					Comment
				</button>
			</div>
		</section>
	)
}
export default WishCommentCreate
