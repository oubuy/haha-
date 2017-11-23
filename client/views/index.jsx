


import React  from 'react';
import ReactDOM  from 'react-dom';

// import AppContainer from 'react-hot-loader';
const mountNode = document.getElementById('app');
import RoutesConfig from './routes'

ReactDOM.render(
   <RoutesConfig/>,
  // <div>1231231</div>,
  mountNode
);

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     mountNode
//   );
// };

// render(RoutesConfig);

// if (module.hot) {
//   module.hot.accept('./routes', (err) => {
//     render(RoutesConfig)
//   });
// }





