import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <>
			<header>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>
			</header>	
					<div className="main">
						<Outlet />
			</div>
		</>
  )
}

export default LayoutAdmin
