function Wish(props) {
	const { wish } = props
	return (
		<>
			<div className='wish__container'>
				<p className='wish__title'>{wish.Title}</p>
				<p className='wish__description'>{wish.Description}</p>
				<a className='wish__externalLink' href={'https://' + wish.Link}>
					{wish.Link}
				</a>
				<p className='wish__commentCount'>{wish.CommentCount}</p>
				<p className='wish__createDate'>{wish.createdAt}</p>
			</div>
		</>
	)
}

export default Wish
