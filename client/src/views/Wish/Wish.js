import WishComponent from '../../Components/Wish'

function Wish(props) {
	const { getWish, id } = props
	const wish = getWish(id)
	// if (wish) {
	// 	console.log(wish.Comments.map((commtent) => commtent))
	// }

	return (
		<>
			<article className='wish'>{wish && <WishComponent wish={wish}></WishComponent>}</article>
			<article className='wish'>
				{wish && (
					<article className='wish__comment'>
						{wish.Comments.map((comment) => {
							return (
								<article key={comment._id}>
									<p>User: {comment.Name}</p>
									<p>Comment: </p>
									<p>{comment.Text}</p>
								</article>
							)
						})}
					</article>
				)}
			</article>
		</>
	)
}

export default Wish
