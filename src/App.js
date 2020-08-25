import React, { useEffect } from 'react';

import {UseMobileDetect} from './components/index.js';;

function App() {
  //return (
  //<UseMobileDetect/>
  

  //);
 
     useEffect(() =>{
      if(UseMobileDetect()) {
        console.log("Yes, this is mobile.");    
        return false;
      }
     });

     
}

export default App;
