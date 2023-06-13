// 3rd party library imports
import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// project imports
import { DispatchAction, appReducer } from './Reducer';
import { defaultState } from './State';
import { initializeSocket, send } from './Socket';
import { MainPage } from './MainPage';

// css imports
import 'animate.css';


/** ------------------------------------------------------------------------ **
 * App component
 ** ------------------------------------------------------------------------ */

function App(): JSX.Element {
  /**
   * This React component bundles together the entire application state + main page GUI.
   */

  const [state, dispatch] = useReducer(appReducer, defaultState);

  useEffect(() => {
    initializeSocket(
      async socket => {
        dispatch(new DispatchAction('SET_SOCKET', { socket }));
        const { songs } = await send(socket, 'get_songs', {});
        dispatch(new DispatchAction('SET_SONGS', { songs }));
      },
      () => {
        dispatch(new DispatchAction('DELETE_SOCKET'));
      },
    );
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainPage state={state} dispatch={dispatch} />
        </Route>
        <Route path="/:instrument">
          <MainPage state={state} dispatch={dispatch} />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
