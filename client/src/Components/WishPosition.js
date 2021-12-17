import apiService from '../apiService'
function WishPosition(props) {
	const { id, changePosition } = props

	async function position(number) {
		if (apiService.loggedIn()) {
			const msg = await changePosition(id, number)
			if (msg) {
				alert(msg)
			}
		} else {
			alert('You need to be logged in to change position')
		}
	}

	return (
		<>
			<article className='position'>
				<i className='fas fa-chevron-up fa-2x position__arrow' onClick={() => position(1)}></i>
				<i className='fas fa-chevron-down fa-2x position__arrow' onClick={() => position(-1)}></i>
			</article>
		</>
	)
}

export default WishPosition
