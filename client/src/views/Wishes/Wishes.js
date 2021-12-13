// import { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import Wish from '../../Components/Wish'

function Wishes(props) {
	const { wishes } = props
	return (
		<>
			<h1 className='quotes__header'>Wishes</h1>
			{wishes.map((wish) => {
				return (
					<article className="wish" key={wish._id}>
						<Link className="wish__link" to={`/wish/${wish._id}`} key={wish._id}></Link>
						<Wish wish={wish}></Wish>
					</article>
				)
			})}
		</>
	)
}

export default Wishes
