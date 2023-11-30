import {doc, addDoc, getDocs, getDoc, query, where, collection, updateDoc} from 'firebase/firestore'
import {db} from "./firebaseConfig.js";
import {fakeMenu1, fakeMenu2} from "../store/cakes/cakes.js";

export const getUserMenu = async (userId) => {
    const q = query(collection(db, "menus"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let results = []
    querySnapshot.forEach((doc) => {
        results.push(
            {
                data: doc.data(),
                id: doc.id
            })
    });
    return results[0].data.menu
}

// const docRef = doc(db, 'users', userUUID);
// const docSnapshot = await getDocs(docRef);
// if(docSnapshot.exists()) {
//     return docSnapshot.data()
// }

export const createUserMenu = (userId) => {
    //console.log(getUser(username))
    addDoc(collection(db, 'menus'), {
        userId,
        createdAt: Date.now(),
        menu: fakeMenu1
    }).then(r => r)
}

// export const getMenu = async (userUUID) => {
//     const docRef = doc(db, 'users', userUUID)
//     const result = await getDoc(docRef)
//     return result.data().menu
// }
//
// export const updateMenu = async (userUUID, newMenu) => {
//     const docRef = doc(db, 'users', userUUID)
//     await updateDoc(docRef, {menu: newMenu});
// }