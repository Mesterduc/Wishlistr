import { useState } from 'react'
import { Link } from '@reach/router'
import apiService from '../../apiService'
import { navigate } from '@reach/router'
function Login(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login() {
		try {
			const user = await apiService.login(email, password)
			localStorage.setItem('username', user.username)
			navigate('/')
		} catch (error) {
			alert(`${error.msg}`)
		}
	}
	function logout() {
		apiService.logout()
	}

	return (
		<>
			<section className='login'>
				{apiService.loggedIn() ? (
					<section className>
						<h1>You are logged in as {localStorage.getItem('username')} </h1>
						<button type='button' onClick={() => logout()}>
							logout
						</button>
					</section>
				) : (
					<div>
					<div>
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
						<button className='login__button' type='button' onClick={() => login()}>
							Login
						</button>
					</div>
						<Link to='/signUp' className='login__signUp'>
							No account? Sign up now
						</Link>
						</div>
				)}
			</section>
		</>
	)
}

export default Login
