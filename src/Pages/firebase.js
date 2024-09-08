import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCeF6sSUy-29gR2kRyCFimLNY1XGEI1Cf8",
  authDomain: "feedbackform-81922.firebaseapp.com",
  projectId: "feedbackform-81922",
  storageBucket: "feedbackform-81922.appspot.com",
  messagingSenderId: "165533688393",
  appId: "1:165533688393:web:e78ba9f4405afe52cf1598",
  measurementId: "G-SB1Q6DDE27"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);

export default db;