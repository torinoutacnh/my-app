// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Provider import
import { Provider } from './Provider'

import { Endpoints } from './components/Endpoint'

function App() {
  return (
    <Router>
      <Provider>
        <Routes>
          {Endpoints.map((endpoint, index) => {
            return (
              <Route key={index} path={endpoint.path} element={endpoint.page} />
            )
          })}
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
