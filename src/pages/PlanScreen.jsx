import React, { useEffect, useState } from 'react'
import db from '../firebase.js'
import './PlanScreen.css'
import { collection, getDocs, where, query, addDoc, onSnapshot, doc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { addSubscription, selectUser, selectSubscription } from '../features/user/userSlice';
import { loadStripe } from '@stripe/stripe-js'
import LoadingSpinner from '../LoadingSpinner.jsx';

function PlanScreen() {

	const [products, setProducts] = useState([])
	const user = useSelector(selectUser)
	const currentSubscription = useSelector(selectSubscription)
	const [subscription, setSubscription] = useState(null)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()


	useEffect(() => {
		console.log("Fetching subscription")
		async function fetchSubscription() {
			const querySnapshot = await getDocs(collection(db, "customers", user.uid, "subscriptions"))
			querySnapshot.forEach(async (subscription) => {
				setSubscription({
					role: subscription.data().role,
					current_period_end: subscription.data().current_period_end.seconds,
					current_period_start: subscription.data().current_period_start.seconds,
				})
			})
		}
		fetchSubscription()


		// if(subscription){
		//     dispatch(addSubscription({
		//         currentPlan: subscription?.role, 
		//       }))
		// }
		// else{
		//     dispatch(addSubscription({
		//         currentPlan: null,
		//     }))
		// }
		// console.log(currentSubscription)  
	}, []);

	useEffect(() => {
		if (subscription) {
			dispatch(addSubscription({
				currentPlan: subscription?.role,
			}))
		}
		else {
			dispatch(addSubscription({
				currentPlan: null,
			}))
		}
	}, [dispatch, subscription])

	// console.log(subscription)
	// console.log("Redux stuff below...")
	// console.log(currentSubscription)


	useEffect(() => {
		async function fetchData() {
			const q = query(collection(db, "products"), where("active", "==", true))
			const querySnapshot = await getDocs(q)
			const products = {}
			querySnapshot.forEach(async (productDoc) => {
				products[productDoc.id] = productDoc.data()
				const priceSnap = await getDocs(collection(productDoc.ref, "prices"))
				priceSnap.docs.forEach((price) => {
					products[productDoc.id].prices = {
						priceId: price.id,
						priceData: price.data(),
					}
				})
			})
			setProducts(products)
		}
		fetchData()
	}, []);
	// Object.entries(products).forEach(([productId, productData]) => {
	//     console.log(productId);
	//     console.log(productData)
	// })
	//console.log(subscription)
	const loadCheckout = async (priceId) => {
		setLoading(true)

		const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
			price: priceId,
			success_url: window.location.origin,
			cancel_url: window.location.origin,
		})

		onSnapshot(docRef, async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				// Show an error to your customer and
				// inspect your Cloud Function logs in the Firebase console.
				alert(`An error occured: ${error.message}`);
			}
			if (sessionId) {
				// We have a Stripe Checkout URL, let's redirect.

				const stripe = await loadStripe('pk_test_51L5VIzKex6J6qCLTEdzyAxUoankWq910zO7EuaLdfFUG5DQZ9anIq8ylRphacAsDJEvya1gEkgRtgY7zgNJLYMBJ00naoZ7GMA')
				stripe.redirectToCheckout({ sessionId })
			}
		})

		setTimeout(() => {
			setLoading(false)
		}, 3000);
		
	}

	return (
		(
			loading ? (
				<LoadingSpinner />
			) : (
				<div className='planScreen'>
				<br />
				{subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString('en-GB')}</p>}
				{
					Object.entries(products).map(([productId, productData]) => {
						// Logic to check user's subscription is active
						const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
						return (
							<div className={`${isCurrentPackage && 'planScreen__plan--disabled'} planScreen__plan`} key={productId}>
								<div className="planScreen__info">
									<h5>{productData.name}</h5>
									<h6>{productData.description}</h6>
								</div>
	
								<button disabled={isCurrentPackage} onClick={() => { loadCheckout(productData.prices.priceId) }}>
									{isCurrentPackage ? "Current" : "Subscribe"}
								</button>
							</div>
						)
	
					})
				}
			</div>
			)
		)
		
	)
}

export default PlanScreen