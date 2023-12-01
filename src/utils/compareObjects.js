/**
 * Deeply compares two objects to determine if they are equal.
 *
 * @param {*} a - The first object to compare.
 * @param {*} b - The second object to compare.
 * @returns {boolean} True if the objects are equal, false otherwise.
 */
export const equals = (a, b) => {
    // If the objects are strictly equal, return true
    if (a === b) return true;

    // If either object is null, or both are not objects, perform simple comparison
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
        return a === b;
    }

    // If the prototypes are not equal, return false
    if (a.prototype !== b.prototype) return false;

    // Get the keys of object a
    const keys = Object.keys(a);

    // If the number of keys is not equal, return false
    if (keys.length !== Object.keys(b).length) return false;

    // Recursively check equality for each key-value pair
    return keys.every(k => equals(a[k], b[k]));
};