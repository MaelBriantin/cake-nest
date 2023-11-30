import {doc, addDoc, getDocs, getDoc, query, where, collection, updateDoc} from 'firebase/firestore'
import {db} from "./firebase-config.js";
import {fakeMenu1} from "../store/cakes/cakes.js";

export const getUser = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    let results = []
    querySnapshot.forEach((doc) => {
        results.push(
            {
                data: doc.data(),
                id: doc.id
            })
    });
    return results
}

// const docRef = doc(db, 'users', userUUID);
// const docSnapshot = await getDocs(docRef);
// if(docSnapshot.exists()) {
//     return docSnapshot.data()
// }

export const createUser = (username) => {
    //console.log(getUser(username))
    addDoc(collection(db, 'users'), {
        username,
        createdAt: Date.now(),
        menu: fakeMenu1
    })
    //setDoc(docRef)
}

export const getMenu = async (userUUID) => {
    const docRef = doc(db, 'users', userUUID)
    const result = await getDoc(docRef)
    return result.data().menu
}

export const updateMenu = async (userUUID, newMenu) => {
    const docRef = doc(db, 'users', userUUID)
    await updateDoc(docRef, {menu: newMenu});
}