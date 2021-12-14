function WishComment(props) {
	const { comments } = props
	return (
		<>
			<article className='wish__comment'>
				{comments.map((comment) => {
					return (
						<article key={comment._id}>
							<p>User: {comment.Name}</p>
							<p>Comment: </p>
							<p>{comment.Text}</p>
							<p>{comment.createdAt}</p>
						</article>
					)
				})}
			</article>
		</>
	)
}

export default WishComment
