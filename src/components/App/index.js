import React from 'react';

import HeaderPanel from '../HeaderPanel/index';
import Main from '../Main/index';
import Footer from '../Footer/index';

import './styles.css';

const App = () => (
  <div className="app">
    <HeaderPanel />
    <Main />
    <Footer />
  </div>
);

export default App;
