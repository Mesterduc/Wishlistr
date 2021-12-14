import { useState } from 'react'
const API_URL = process.env.REACT_APP_API
function WishCommentCreate(props) {
	const { id, postComment } = props
    
    const [name, setName] = useState([])
    const [text, setText] = useState([])
    
    
	return (
		<>
			<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(event) => setName(event.target.value)}
				></input>
			<input
					type='text'
					placeholder='Text'
					value={text}
					onChange={(event) => setText(event.target.value)}
				></input>
                <button type='button' onClick={() => postComment(id, name, text)}>Comment</button>
		</>
	)
}
export default WishCommentCreate

