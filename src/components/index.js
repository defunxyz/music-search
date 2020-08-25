/**
 * A simple component to look if the device is a mobile phone or not.
 * If a mobile unit is detected it returns true, otherwise false.
 * @file hooks/index.js
 * @author Jerry
 * @copyright 2020 Jerry
 */

import { useEffect } from 'react';
import { render } from '@testing-library/react';

export const UseMobileDetect = () => {
    useEffect(() => {
		let phoneExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile' , 'i');
		if (phoneExp.test(navigator.userAgent)){
			return true;
		} else{
			return false;
		}  
    }, []);
    
    //<script src="mobile.js"></script>
    return(<><h2>Mobile Detect </h2></>);
};
