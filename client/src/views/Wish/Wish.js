import { navigate} from '@reach/router'
import WishComponent from '../../Components/Wish'
import WishComment from '../../Components/WishComment'
import WishCommentCreate from '../../Components/WishCommentCreate'
import apiService from '../../apiService'

function Wish(props) {
	const { getWish, id, postComment, gifted, deleteWish } = props
	const wish = getWish(id)

	function isGifted() {
		if(apiService.loggedIn()){
			gifted(id, !wish.isGifted)
		}else {
			alert("You need to be logged in, to change gift status")
		}
	}

	// function deleteWish(){
	// 	if(apiService.loggedIn()){
	// 		deleteWish(id)
	// 		// navigate("/")
	// 	}else {
	// 		alert("You need to be logged in, to delete this wish")
	// 	}
	// }

	return (
		<>
			{wish && (
				<div className='wish' >
					<WishComponent  wish={wish} gifted={gifted}></WishComponent>
					<button type='checkbox' onClick={() => isGifted()}>
						Gifted
					</button>
					<button type='checkbox' onClick={() => deleteWish(id)}>
						Delete wish
					</button>
					<WishCommentCreate id={wish._id} postComment={postComment}></WishCommentCreate>
					<WishComment comments={wish.Comments}></WishComment>
				</div>
			)}
		</>
	)
}
export default Wish
