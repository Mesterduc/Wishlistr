// import jwtDecode from 'jwt-decode'
const API_URL = process.env.REACT_APP_API

class ApiService {
	constructor(api_url) {
		this.api_url = api_url
	}
	// login
	async login(email, password) {
		const response = await this.post('/user/auth', {
			email,
			password,
		})
		this.setToken(response.token)
		return response
	}
	// crud wish
	async getWishes() {
		const response = await this.get('/wish')
		return response
	}

	async postWish(data) {
		const response = await this.post('/wish', data)
		return response
	}

	async deleteWish(id) {
		const response = await this.delete('/wish', id)
		return response
	}

	async editWish(data){
		const response = await this.put('/wish', data)
		return response
	}

	// wish comment
	async postComment(data) {
		const response = await this.post('/wish/:id/comment', data)
		return response
	}
	// wish isGifted
	async gifted(id) {
		const response = await this.put('/wish/:id/isGifted', id)
		return response
	}


	loggedIn() {
		// const hej = jwtDecode(this.getToken())
		// console.log(hej)
		return this.getToken() !== null
	}

	setToken(token) {
		localStorage.setItem('token', token)
	}

	getToken() {
		return localStorage.getItem('token')
	}

	logout() {
		localStorage.removeItem('token')
	}

	async makeRequest(path, options) {
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}

		// Automatically append the token if the user is logged in
		if (this.loggedIn()) {
			headers['Authorization'] = `Bearer ${this.getToken()}`
		}
		try {
			const response = await fetch(this.api_url + path, {
				headers: headers,
				...options,
			})

			const parsedResponse = await response.json()
			if (response.ok) {
				return parsedResponse
			} else {
				// The response contains an object with an error message; throw it as an error
				throw parsedResponse
			}
		} catch (error) {
			throw error
		}
	}

	// Helper method for easy GET requests
	get(path) {
		return this.makeRequest(path, { method: 'GET' })
	}

	// Helper method for easy POST requests; just pass body as an object
	post(path, body) {
		return this.makeRequest(path, {
			method: 'POST',
			body: body ? JSON.stringify(body) : null,
		})
	}
	put(path, body) {
		return this.makeRequest(path, {
			method: 'PUT',
			body: body ? JSON.stringify(body) : null,
		})
	}
	delete(path, body) {
		return this.makeRequest(path, {
			method: 'DELETE',
			body: body ? JSON.stringify(body) : null,
		})
	}
}

// Export a single instance of the class
const apiService = new ApiService(API_URL)

export default apiService
