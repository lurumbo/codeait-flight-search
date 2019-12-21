import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Home Page</h1>   
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>

  );
}

export default App;
