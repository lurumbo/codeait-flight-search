import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import CarouselApp from './components/Carousel';

class App extends Component {

  render () {
    return (
      <Container>
        <Header to="/" />
        <Row className="section__container">
          <Col>
            <h2>Welcome</h2>
            <p>Find the best deals on flights. Book your city for your fantastic holidays with us now!</p>
            <CarouselApp />
          </Col>
        </Row>
        <Row className="action-button__container" style={{textAlign: 'center', marginBottom: 50}}>
          <Col>
            <Link to="/search" className="btn btn-primary">Search flights!</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
