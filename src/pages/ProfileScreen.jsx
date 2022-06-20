import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import { auth } from '../firebase';
import Nav from '../Nav'
import './ProfileScreen.css'
import PlanScreen from './PlanScreen';

function ProfileScreen() {
    const user = useSelector(selectUser)
    return (
        <div className='profileScreen'>
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://occ-0-116-2430.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABa4n37RGjroxypIEJlngjefK6dd5CHfRBaxsvTP5WvxpgacTesUccEwRcBDCo_1jnZS5vBkP7m5MwKJlhs2ZtfwMPnOwDpw.png?r=fdd" alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <PlanScreen />
                            <button className='profileScreen__signOut' onClick={() => auth.signOut()}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen