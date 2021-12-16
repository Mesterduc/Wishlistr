import { useState } from 'react'
import { Link } from '@reach/router'
import apiService from '../../apiService'
function SignUp(props) {
    
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function signUp() {
		if(email && username && password){
			const hej = await apiService.createUser(email, username, password)
			console.log(hej)
		}
	}

	return (
		<>
			<section className="signUp">
			<h1 className="signUp__header">Sign Up to Wishlistr</h1>
				<input
				className="signUp__input"
					type='email'
					placeholder='Email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				></input>
				<input
				className="signUp__input"
					type='text'
					placeholder='Username'
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				></input>
				<input
				className="signUp__input"
					type='password'
					placeholder='Password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				></input>
				<button className="signUp__button" type='button' onClick={() => signUp()}>
					Sign Up
				</button>
				<Link to="/login" className="signUp__signUp">Sign in </Link>
			</section>
		</>
	)
}

export default SignUp
