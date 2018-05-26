import React from 'react';
import { Container } from 'semantic-ui-react';

import Header from '../../components/Header';
import Main from '../../components/Main';
import Footer from '../../components/Footer';

import './styles.css';

const App = () => (
  <Container className="app">
    <Header />
    <Main />
    <Footer />
  </Container>
);

export default App;
