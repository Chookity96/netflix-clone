import React, { useRef } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


import './SignUpScreen.css';

function SignUpScreen( {email} ) {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const register = (e) => {
        e.preventDefault()

            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const signIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className='signUpScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Email' defaultValue={email} />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button type='submit' onClick={signIn}>Sign In</button>

                <h4>
                    <span className='signUpScreen__gray'>New to Netflix?</span>
                    <span className='signUpScreen__link' onClick={register}> Sign Up Now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignUpScreen