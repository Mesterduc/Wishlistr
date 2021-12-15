import { useState, useEffect } from 'react'
function WishEdit(props) {
	const { getWish, id } = props
	const wish = getWish(id)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    // console.log(wish)
    
    useEffect(() => {
        if(wish){
            setTitle(wish.Title)
            setDescription(wish.Description)
            setLink(wish.Link)
        }
	}, [])

	return (
		<>
			{wish && (
				<article className='wish-form__form'>
					<label className='wish-form__label' >Title:</label>
					<input className='wish-form__title' value={title} onChange={(event) => setTitle(event.target.value)}/>
					<label className='wish-form__label'>Description:</label>
					<input className='wish-form__description' value={description} onChange={(event) => setDescription(event.target.value)}/>
					<label className='wish-form__label'>Link:</label>
					<input className='wish-form__link' value={link} onChange={(event) => setLink(event.target.value)}/>

					<button className='wish-form__button'>Confirm</button>
				</article>
			)}
		</>
	)
}

export default WishEdit
