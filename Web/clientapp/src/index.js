import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import GeneralLayout from './components/Layouts/GeneralLayout';
import ConfigureStore from './utils/store/ConfigureStore';

const store = ConfigureStore;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store} >
      <Routes>
        <Route path="*" element={<GeneralLayout />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);