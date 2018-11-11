import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import ScrollToTop from './components/scrollToTop';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const history = createBrowserHistory();

export const updateHistory = path => {
  history.push(path);
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {/* <Router> */}
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
