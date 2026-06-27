import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GlassHeader from './components/GlassHeader';
import ContactButton from './components/ContactButton';
import HomePage from './pages/HomePage';
import logo from './assets/Logo2.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Хедер будет на всех страницах */}
        <GlassHeader>
          <Link to="/" className="glass-header-logo">
            <img src={logo} alt="Neon Show" />
          </Link>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="/">Главная</a>
            <a href="/gallery">Галерея</a>
            <a href="/about">О нас</a>
          </nav>
        </GlassHeader>

        {/* Контент страниц */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Другие страницы */}
          </Routes>
        </div>

        <ContactButton />
      </div>
    </Router>
  );
}

export default App;