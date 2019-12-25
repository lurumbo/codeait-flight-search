import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';

class App extends Component {

  render () {
    return (
      <Container>
        <Header />
        <Row>
          <Col>
            <Link to="/search" className="btn btn-primary">Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
