import React from 'react';

import { useMobileDetect } from './hooks/UseMobileDetect.js';;

function App() {
  const detectMobile = useMobileDetect();

  return (
    <>
      <h2>Mobile Detect</h2>
      {detectMobile.isMobile() && <p>This is <strong>Mobile</strong></p>}
      {!detectMobile.isMobile() && <p>This is <strong>Desktop or some other unknown device.</strong></p>}
    </>
  );
}

export default App;
