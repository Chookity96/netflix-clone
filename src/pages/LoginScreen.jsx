import React, { useState, useRef } from 'react'
import './LoginScreen.css'
import SignUpScreen from './SignUpScreen'

function LoginScreen() {
	const [signIn, setSignIn] = useState(false)
	const [email, setEmail] = useState("")
	console.log(email)
	return (
		<div className='loginScreen'>
			<div className="loginScreen__background">
				<img
					className='loginScreen__logo'
					src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />

				<button onClick={() => setSignIn(true)} className='loginScreen__btn'>Sign In</button>

				<div className='loginScreen__gradient' />
			</div>

			<div className="loginScreen__body">
				{
					signIn ? (
						<SignUpScreen email={email} />
					) : (
						<>
							<h1>Unlimited movies, TV shows, and more.</h1>
							<h2>Watch anywhere. Cancel anytime.</h2>
							<h3>Ready to watch? Enter your email to create or restart your membership.</h3>

							<div className="loginScreen__input">
								<form>
									<input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}  />
									<button onClick={(e) => {e.preventDefault(); setSignIn(true);}} className='loginScreen__getStarted'>GET STARTED</button>
								</form>
							</div>
						</>
					)
				}

			</div>
		</div>
	)
}

export default LoginScreen