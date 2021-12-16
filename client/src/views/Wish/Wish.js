import WishComponent from '../../Components/Wish'
import WishComment from '../../Components/WishComment'
import WishCommentCreate from '../../Components/WishCommentCreate'
import WishEdit from '../../Components/WishEdit'
import apiService from '../../apiService'
import { useState } from 'react'

function Wish(props) {
	const { getWish, id, postComment, gifted, deleteWish, editWish } = props
	const wish = getWish(id)

	const [isEdit, setIsEdit] = useState(false)

	function isGifted() {
		if (apiService.loggedIn()) {
			gifted(id, !wish.isGifted)
		} else {
			alert('You need to be logged in, to change gift status')
		}
	}
	function showModal(){
		setIsEdit(!isEdit)
	}

	return (
		<>
			{isEdit && <WishEdit wish={wish} showModel={showModal} editWish={editWish}></WishEdit>}
			{wish && (
				<section className='wish'>
					<WishComponent wish={wish} gifted={gifted}></WishComponent>
					<article className='wish__button-container'>

					<button className='wish__button wish__button-gifted' onClick={() => isGifted()}>
						Gifted
					</button>
					<button className='wish__button wish__button-delete' onClick={() => deleteWish(id)}>
						Delete wish
					</button>
					<button className='wish__button wish__button-edit' onClick={() => showModal()}>
						Edit wish
					</button>
					</article>
					<WishCommentCreate id={wish._id} postComment={postComment}></WishCommentCreate>
					<WishComment comments={wish.Comments}></WishComment>
				</section>
			)}
		</>
	)
}
export default Wish
