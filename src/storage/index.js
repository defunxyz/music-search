/*
  Author: Fisnik
*/
import Cookies from 'universal-cookie';
const cookie = new Cookies();
/**
 * 
 * @param {*} key 
 */
const loadData = (key='musicapp') => {
    const serializedData = cookie.get(key);
    if (serializedData) {
        return JSON.parse(JSON.stringify(serializedData));
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
    const serializedData = JSON.stringify(data);
    cookie.set(key, serializedData, { path: '/' });
}

const clearLocalStorage = () => {
    cookie.remove('musicapp');
}

export { loadData, saveData, clearLocalStorage }; 