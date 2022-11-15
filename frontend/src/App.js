import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
        <Header />
          <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen />} exact />
          {/* <HomeScreen />   */}
            </Routes>
          </Container>
        </main>
      <Footer />
  </Router>
    );
}

export default App;
