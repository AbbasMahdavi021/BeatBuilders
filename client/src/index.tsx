// 3rd party library imports
import React from 'react';
import ReactDOM from 'react-dom';

// project imports
import App from './App';

// CSS
import './index.css';
import './tachyons.css';


/** ------------------------------------------------------------------------ **
 * Client entry point
 * 
 *                              i1 i2 i3 i4      v1 v2 v3 v4
 *                               |  |  |  |       |  |  |  |
 *             index.tsx        Instruments.tsx  Visualizers.tsx
 *                |                        \       /
 *                v                         v     v
 *              App.tsx <---------------   State.tsx
 *                |
 *                v
 *            MainPage.tsx
 *                |
 *                v
 *            SideNav.tsx 
 ** ------------------------------------------------------------------------ */

function onReactLoaded() {
  console.log('React has loaded.');
}

const rootEl = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl,  // Insert into DOM here
  onReactLoaded,
);
