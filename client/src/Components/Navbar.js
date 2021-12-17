import { Link } from '@reach/router'
import apiService from '../apiService'

function navbar() {
	function logout() {
		apiService.logout()
		localStorage.clear()
	}
	return (
		<>
			<nav className='nav'>
				<Link className='nav__link' to='/'>
					Home
				</Link>
				<Link className='nav__link' to='/createWish'>
					Create
				</Link>
				{apiService.loggedIn() ? (
					<p className='nav__link' onClick={() => logout()}>
						Logout
					</p>
				) : (
					<Link className='nav__link' to='/login'>
						Login
					</Link>
				)}
			</nav>
		</>
	)
}

export default navbar
