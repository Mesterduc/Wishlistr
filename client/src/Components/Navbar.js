import {Link } from '@reach/router'

function navbar() {
	return (
		<>
			<nav className="nav">
				<Link className="nav__link" to="/">Home</Link>
				<Link className="nav__link"to="/createWish">Create</Link>
			</nav>
		</>
	)
}

export default navbar
