import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Header = (props) => (
    <Row className="header">
        <Col>
          <Link to="/" className="header__link" >
            <h1>Flight Search App</h1>
          </Link>
          <p>Find the best flights for your ideal trip!</p>   
        </Col>
        <Col className="header-goback__container">
          <Link to={props.to}>
            {props.label}
          </Link>
        </Col>
    </Row>
);

export default Header;