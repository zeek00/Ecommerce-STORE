import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './stylesheets/index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import store from "./app/store";
import { fetchUserDataAsync } from './features/session/dataThunks';
import { getToken } from './helpers/helperFunctions';
import reportWebVitals from './reportWebVitals';
import history from './helpers/history';


if(getToken()){
  store.dispatch(fetchUserDataAsync());
}



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
