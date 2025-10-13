import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SupabaseTest from './components/SupabaseTest';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Vehicle from './pages/Vehicle';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/vehicle/:id" element={<Vehicle />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/test-supabase" element={<SupabaseTest />} />
            </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

