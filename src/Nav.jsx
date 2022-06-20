import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectSubscription } from './features/user/userSlice';
import './Nav.css';

function Nav({ currentPage }) {
	const currentSubscription = useSelector(selectSubscription)
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const [openMenu, setOpenMenu] = useState(false)

	function transitionNavBar() {
		if (window.scrollY > 100) {
			setShow(true)
		}
		else {
			setShow(false)
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar)

		return () => {
			window.removeEventListener("scroll", transitionNavBar)
		}
	}, [])

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<div className="nav__container">
				<img onClick={() => { currentSubscription.currentPlan ? navigate("/") : alert("Please Subscribe to Access Netflix Shows!") }} className='nav__logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
				{
					location.pathname !== "/profile" && (
						<div className='nav__links--container'>
							<ul className="nav__links">
								<li className='nav__link'>
									<a
										className={`nav__link--anchor cursor ${currentPage && "nav__link--bold"}`}
										onClick={() => { currentSubscription.currentPlan ? navigate("/") : alert("Please Subscribe to Access Netflix Shows!") }}
									>Home</a>
								</li>
								<li className='nav__link'>
									<a className='nav__link--anchor not_allowed' href="/">Series</a>
								</li>
								<li className='nav__link'>
									<a className='nav__link--anchor not_allowed' href="/">Films</a>
								</li>
								<li className='nav__link'>
									<a className='nav__link--anchor not_allowed' href="/">New & Popular</a>
								</li>
								<li className='nav__link'>
									<a className='nav__link--anchor not_allowed' href="/">My List</a>
								</li>
								<li className='nav__link'>
									<a className='nav__link--anchor not_allowed' href="/">Audio & Subtitles</a>
								</li>
							</ul>

							<div className="nav__menu">
								<div className="nav__menu--btn" onClick={() => setOpenMenu(!openMenu)}>
									Browse <div className="arrow-down"></div>
								</div>
								{
									openMenu && (
										<div className="nav__options">
											<ul className="nav__option--list border--top">
												<li className="nav__option">
													<a href="" className={`nav__option--anchor ${currentPage && "nav__link--bold"}`}>Home</a>
												</li>
												<li className="nav__option">
													<a href="" className="nav__option--anchor">Series</a>
												</li>
												<li className="nav__option">
													<a href="" className="nav__option--anchor">Films</a>
												</li>
												<li className="nav__option">
													<a href="" className="nav__option--anchor">New & Popular</a>
												</li>
												<li className="nav__option">
													<a href="" className="nav__option--anchor">My List</a>
												</li>
												<li className="nav__option">
													<a href="" className="nav__option--anchor">Audio & Subtitles</a>
												</li>
											</ul>
										</div>
									)
								}
							</div>
						</div>
					)
				}


				<img onClick={() => navigate("/profile")} className='nav__avatar' src="https://occ-0-116-2430.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABa4n37RGjroxypIEJlngjefK6dd5CHfRBaxsvTP5WvxpgacTesUccEwRcBDCo_1jnZS5vBkP7m5MwKJlhs2ZtfwMPnOwDpw.png?r=fdd" alt="" />
			</div>

		</div>
	)
}

export default Nav