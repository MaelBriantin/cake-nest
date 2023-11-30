import {doc, addDoc, getDocs, getDoc, query, where, collection, updateDoc} from 'firebase/firestore'
import {db} from "./firebaseConfig.js";
import {fakeMenu1, fakeMenu2} from "../store/cakes/cakes.js";

/**
 * Retrieves the menu data for a specified user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves with the user's menu data,
 *                                or null if no menu is found for the user.
 * @throws {Error} If an error occurs during the retrieval process.
 *
 * @example
 * // Example usage:
 * const userId = 'exampleUserId';
 * try {
 *   const userMenu = await getUserMenu(userId);
 *   console.log(userMenu);
 *   // Output: { data: {...}, id: 'documentId' }
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const getUserMenu = async (userId) => {
    const q = query(collection(db, 'menus'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    let results = [];

    querySnapshot.forEach((doc) => {
        results.push({
            data: doc.data(),
            id: doc.id,
        });
    });
    return results[0];
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

export const getMenu = async (menuId) => {
    const docRef = doc(db, 'menus', menuId)
    const result = await getDoc(docRef)
    return result.data().menu
}

export const updateMenu = async (menuId, newMenu) => {
    const docRef = doc(db, 'menus', menuId)
    await updateDoc(docRef, {menu: newMenu});
}