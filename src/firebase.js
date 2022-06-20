import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCp3xtk5XlMHb6neh62Ou_3fi3Hr8dmJcg",
  authDomain: "netflix-clone-7cdf9.firebaseapp.com",
  projectId: "netflix-clone-7cdf9",
  storageBucket: "netflix-clone-7cdf9.appspot.com",
  messagingSenderId: "270561706868",
  appId: "1:270561706868:web:756a33d91698fd0ee86221"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp);

export { auth };
export default db;