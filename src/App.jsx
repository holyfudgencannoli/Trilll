import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
