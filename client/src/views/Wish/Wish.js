import WishComponent from '../../Components/Wish'
import WishComment from '../../Components/WishComment'
import WishCommentCreate from '../../Components/WishCommentCreate'
import apiService from '../../apiService'
import { useState } from 'react'

function Wish(props) {
	const { getWish, id, postComment, gifted, deleteWish, children } = props
	const wish = getWish(id)

	const [isEdit, setIsEdit] = useState(true)

	function isGifted() {
		if (apiService.loggedIn()) {
			gifted(id, !wish.isGifted)
		} else {
			alert('You need to be logged in, to change gift status')
		}
	}

	return (
		<>
			{isEdit && (
				<section className='wish-form' onClick={() => setIsEdit(!isEdit)}>
					<div className='wish-form__container'>
						<button className='wish-form__cancel' onClick={() => setIsEdit(!isEdit)}>x</button>
						{children}
					</div>
				</section>
			)}
			{wish && (
				<div className='wish'>
					<WishComponent wish={wish} gifted={gifted}></WishComponent>
					<button type='checkbox' onClick={() => isGifted()}>
						Gifted
					</button>
					<button type='checkbox' onClick={() => deleteWish(id)}>
						Delete wish
					</button>
					<button type='checkbox' onClick={() => setIsEdit(!isEdit)}>
						Edit wish
					</button>
					<WishCommentCreate id={wish._id} postComment={postComment}></WishCommentCreate>
					<WishComment comments={wish.Comments}></WishComment>
				</div>
			)}
		</>
	)
}
export default Wish
