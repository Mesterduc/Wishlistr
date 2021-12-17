import { Link } from '@reach/router'
import Wish from '../../Components/Wish'
import WishPosition from '../../Components/WishPosition'

import React from 'react'

function Wishes(props) {
	const { wishes, changePosition } = props
	return (
		<section className='wishes'>
			<div className='wishes__header-container'>
				<h1 className='wishes__header'>My Wishes</h1>
			</div>

			{wishes.map((wish) => {
				return (
					<article className='wish' key={wish._id}>
						<WishPosition id={wish._id} changePosition={changePosition}></WishPosition>
						<Link className='wish__link' to={`/wish/${wish._id}`}></Link>
						<Wish wish={wish}></Wish>
					</article>
				)
			})}
		</section>
	)
}

export default Wishes
