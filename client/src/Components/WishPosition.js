

function WishPosition(props) {
	const { id, changePosition} = props
	
	return (
		<>
            <article className="position">
			<i className="fas fa-chevron-up fa-2x position__arrow" onClick={() => changePosition(id, 1)} ></i>
            <i className="fas fa-chevron-down fa-2x position__arrow" onClick={() => changePosition(id, -1)}></i>

            </article>
		</>
	)
}

export default WishPosition
