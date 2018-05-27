import React from 'react';
import { Container } from 'semantic-ui-react';

import HeaderPanel from '../../components/HeaderPanel';
import Main from '../../components/Main';
import Footer from '../../components/Footer';

import './styles.css';

const App = () => (
  <Container className="fill-content">
    <HeaderPanel />
    <Main />
    <Footer />
  </Container>
);

export default App;
