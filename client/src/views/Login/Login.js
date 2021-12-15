import { useState } from 'react'
import { navigate } from '@reach/router'
import apiService from '../../apiService'
function Login(props) {
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])

	async function login() {
		try{
			await apiService.login(email, password)
			// navigate('/')
		}catch(error){
			alert(`${error.msg}`)
		}
	}

	function getToken(){
		console.log(apiService.getToken())
	}
	function logout(){
		apiService.logout()
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
