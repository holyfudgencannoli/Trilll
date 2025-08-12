import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <nav>
        <Link to="/">Go to Home</Link>
      </nav>
      <p>This is a React app served by Cloudflare Workers!</p>
    </div>
  );
}
