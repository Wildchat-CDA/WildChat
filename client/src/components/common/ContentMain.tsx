// import React from 'react';
// import GlobalCall from '../../GlobalCall';

// function ContentMain() {
//   return (
//     <>
//     <main className="content-main">
//       {/* Contenu principal ici */}
//       <GlobalCall />
//       <h1>cccccccccccccc</h1>
//     </main>
//     </>
//   );
// }

// export default ContentMain;

import React from 'react';
import GlobalCall from '../../GlobalCall';
import Room from '../../page/Room';

function ContentMain() {
  return (
    <>
 
    <main className="content-main">
      {/* Contenu principal ici */}
      <GlobalCall />
       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div><Room /></div>
       </div>
    </main>
    </>
  );
}

export default ContentMain;