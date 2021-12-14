import WishComponent from '../../Components/Wish'
import WishComment from '../../Components/WishComment'
import WishCommentCreate from '../../Components/WishCommentCreate'

function Wish(props) {
	const { getWish, id, postComment } = props
	const wish = getWish(id)

	return (
		<>
			<article className='wish'>{wish && <WishComponent wish={wish}></WishComponent>}</article>
			<article className='wish'>{wish && <WishCommentCreate id={wish._id} postComment={postComment}></WishCommentCreate>}</article>
			<article className='wish'>{wish && <WishComment comments={wish.Comments}></WishComment>}</article>
		</>
	)
}
export default Wish
