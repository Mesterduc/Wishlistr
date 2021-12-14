import { useState } from 'react'
import { navigate } from '@reach/router'
function Login(props) {
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])

	function login() {
		navigate('/')
	}
	return (
		<>
			<p>login page</p>
			<section>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				></input>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				></input>
				<button type='button' onClick={() => login()}>
					Login
				</button>
			</section>
		</>
	)
}

export default Login
