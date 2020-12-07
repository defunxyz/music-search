/*
  Author: Fisnik
*/

/**
 * 
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
 * 
 * @param {*} data 
 * @param {*} key 
 */
const saveData = (data, key='musicapp') => {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
}

const clearLocalStorage = () => {
    localStorage.clear();
}

export { loadData, saveData, clearLocalStorage }; 