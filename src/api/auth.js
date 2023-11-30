import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "./firebaseConfig.js";

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


