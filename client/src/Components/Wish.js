
function Wish(props) {
	const { wish} = props
	
	return (
		<>	
			<div className='wish__container' style={{backgroundColor: `${wish.isGifted ? "Gray" : "White"}`}}>
				<h1 className='wish__title' style={{color: wish.isGifted ? "black" : "green", textDecoration: wish.isGifted ? "line-through" : ""}}>{wish.Title}</h1>
				 <p className='wish__description'><span className='wish__label'>Note:</span>{wish.Description}</p>
				<p className='wish__site'> <span className='wish__label'>Link to site: </span><a className='wish__externalLink' href={'https://' + wish.Link}>
				{wish.Link}
				</a></p>
				  
				<p className='wish__commentCount'><span className='wish__label'>Comments:</span>{wish.CommentCount}</p>
				<p className='wish__createDate'><span className='wish__label'>Added to Wishlist on:</span>{wish.createdAt}</p>
				<p className='wish__position'><span className='wish__label'>Priority:</span>{wish.Position}</p>
			</div>
		</>
	)
}

export default Wish
