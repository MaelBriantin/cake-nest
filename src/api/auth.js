import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./firebaseConfig.js";
import {useEffect} from "react";

export const auth = getAuth(app);
