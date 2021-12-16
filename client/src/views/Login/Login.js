import { useState } from 'react'
import { Link } from '@reach/router'
import apiService from '../../apiService'
function Login(props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login() {
		try {
			await apiService.login(email, password)
			// navigate('/')
		} catch (error) {
			alert(`${error.msg}`)
		}
	}

	function getToken() {
		console.log(apiService.getToken())
	}
	function logout() {
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
				<button className='login__button' type='button' onClick={() => login()}>
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
