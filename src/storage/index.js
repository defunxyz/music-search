/**
 * @file storage
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

/**
 * Loads the data from localstorage given an identification key
 * @param {*} key 
 */
const loadData = (key='musicapp') => {
    const serializedState = window.localStorage.getItem(key);
    if (serializedState) {
        return JSON.parse(serializedState);
    } else {
        return undefined;
    }
}

/**
 * Saves data to localstorage given an identification key
 * 
 * @param {*} data 
 * @param {*} key 
 */
const saveData = (data, key='musicapp') => {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
}

/**
 * Clears all data in localstorage
 */
const clearLocalStorage = () => {
    localStorage.clear();
}

export { loadData, saveData, clearLocalStorage }; 