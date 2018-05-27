import React from 'react';

import HeaderPanel from '../../components/HeaderPanel';
import Main from '../../components/Main';
import Footer from '../../components/Footer';

import './styles.css';

const App = () => (
  <div className="app">
    <HeaderPanel />
    <Main />
    <Footer />
  </div>
);

export default App;
