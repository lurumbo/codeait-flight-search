import React from 'react';
import { Link } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <h1>Home Page</h1>
        <article>
          <section>
            <h2>Promotions</h2>
          </section>
          <section>
            <div>
              <Link to="/search">Search</Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

export default App;
