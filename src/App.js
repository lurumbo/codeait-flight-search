import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import FlightsDataProvider from './components/FlightsDataProvider';
import FlightsContext from './components/FlightsContext';
import flightsCOR from './data/epa-cor.json';
import flightsMDZ from './data/epa-mdz.json';
import airports from './data/routes.json';
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
