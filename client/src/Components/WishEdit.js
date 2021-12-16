import { useState, useEffect } from 'react'
function WishEdit(props) {
	const { wish, editWish, showModel } = props

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [link, setLink] = useState('')

	useEffect(() => {
		if (wish) {
			setTitle(wish.Title)
			setDescription(wish.Description)
			setLink(wish.Link)
		}
	}, [])

	function edit() {
		editWish(title, description, link, wish._id)
        showModel()
	}

	return (
		<>
			<section className='wish-form'>
				<article className='overlay' onClick={() => showModel()}></article>
				<div className='wish-form__container'>
					<button className='wish-form__cancel' onClick={() => showModel()}>
						x
					</button>

					<article className='wish-form__form'>
						<label className='wish-form__label'>Title:</label>
						<input
							className='wish-form__title'
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
						<label className='wish-form__label'>Description:</label>
						<input
							className='wish-form__description'
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
						<label className='wish-form__label'>Link:</label>
						<input
							className='wish-form__link'
							value={link}
							onChange={(event) => setLink(event.target.value)}
						/>

						<button className='wish-form__button' onClick={() => edit()}>
							Confirm
						</button>
					</article>
				</div>
			</section>
		</>
	)
}

export default WishEdit
