import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import MyAccount from './components/myAccount';
import FeedExternal from './components/feedExternal';
import './index.css';
import { Provider } from 'react-redux'
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';
import { Amplify, Storage } from 'aws-amplify';
import awsExports from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

Storage.configure({
  customPrefix: {
      protected: 'protected/'
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>y se marchoo ...</h1>,
  },
  {
    path: "/profile",
    element: <MyAccount />,
    errorElement: <h1>y se marchoo ...</h1>,
  },
  {
    path: "/external/:accountId",
    element: <FeedExternal />,
    errorElement: <h1>y se marchoo ...</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AmplifyProvider>
        <RouterProvider router={router} />
      </AmplifyProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
