function WishComment(props) {
	const { comments } = props
	return (
		<>
			<article className='wish-comment'>
				{comments.map((comment) => {
					return (
						<article className='wish-comment-container' key={comment._id}>
							<p className='wish-comment__text'>
								<span className='wish-comment__label'>User:</span> {comment.Name}
							</p>
							<p className='wish-comment__text'>
								<span className='wish-comment__label'>Comment:</span>
								{comment.Text}
							</p>
							<p className='wish-comment__text'>
								<span className='wish-comment__label'>Date:</span>
								{comment.createdAt}
							</p>
						</article>
					)
				})}
			</article>
		</>
	)
}

export default WishComment
