import { useState } from 'react'
import { Link } from '@reach/router'
import apiService from '../../apiService'
function Login(props) {
	// const { loginUser, signoutUser } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login(e) {
		try {
			const user = await apiService.login(email, password)
			// console.log(user.role)
			localStorage.setItem('username', user.username)
			// localStorage.setItem('role', user.role)
			// console.log(e.localStorage.getItem('username'))
			// loginUser(user.role, user.username)
			// navigate('/')
		} catch (error) {
			alert(`${error.msg}`)
		}
	}

	function getToken() {
		// console.log(apiService.getToken())
		const hej = localStorage.getItem('username')
		console.log(localStorage.getItem('username'))
	}
	function logout() {
		// signoutUser()
		apiService.logout()
	}

	return (
		<>
			<section className='login'>
				<h1 className='login__header'>Login to Wishlistr</h1>
				<input
					className='login__input'
					type='email'
					placeholder='Email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				></input>
				<input
					className='login__input'
					type='password'
					placeholder='Password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				></input>
				<button className='login__button' type='button' onClick={(e) => login(e)}>
					Login
				</button>
				<Link to='/signUp' className='login__signUp'>
					No account? Sign up now
				</Link>
			</section>
			<button type='button' onClick={() => getToken()}>
				token
			</button>
			<button type='button' onClick={() => logout()}>
				logout
			</button>
		</>
	)
}

export default Login
