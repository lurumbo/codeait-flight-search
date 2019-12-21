import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ListItem from './ListItem';
import airports from '../data/routes.json';


class Search extends Component {

    constructor (props) {
        super(props);
        this.state = {
            airports: airports.routes,
            airportSelected: null,
            destination: null
        }
    }

    onClickOriginAirportHandler (airport) {
        console.log ('selected:', airport);
        this.setState({
            airportSelected: airport
        });
    }

    onClickDestinationAirportHandler (destination) {
        console.log('destination', destination);
        this.setState({
            destination: destination
        })
    }

    render () {
        const isOrigin = true;

        const airport = this.state.airportSelected;
        const destinationMessage = this.state.airportSelected ? 
            `Destinations available for ${airport.location.cityName} aiport.` : 
            `Destinations available for selected aiport.`;

        return (
            <Container>
                <Row className="header">
                    <Col>
                        <h1>Select your {isOrigin ? 'origin' : 'destination'}</h1>
                    </Col>
                </Row>
                <Row className="aiportInformation">
                    <Col>
                        <section>                            
                            <p>Please, choose your origin airport.</p>
                            <ul className="list-unstyled">
                                {
                                    this.state.airports.map( airport => 
                                        <ListItem 
                                            airport={airport}
                                            location={airport.location.cityName} 
                                            code={airport.code} 
                                            key={airport.code}
                                            onClick={() => this.onClickOriginAirportHandler(airport)}
                                        />
                                    )
                                }
                            </ul>
                        </section> 
                    </Col>
                        <Col>
                            <p>{destinationMessage}</p>                            
                            <ul className="list-unstyled">
                                {
                                    this.state.airportSelected?.destinations.map ( destination => 
                                        <ListItem 
                                            airport={destination}
                                            location={destination.location.cityName} 
                                            code={destination.code} 
                                            key={destination.code}
                                            onClick={() => this.onClickDestinationAirportHandler(destination)} 
                                        />
                                    )
                                }
                            </ul>
                        </Col>
                    
                </Row>
                <hr />
                <Row>                    
                    <Col>
                        <article>
                            <h3>Select your {isOrigin ? 'origin' : 'destination'}</h3>
                            <section>
                            <p>
                                Here should be a card approach list of all available origin
                                airports. When an origin airport is selected, the list should
                                display all available destination for given selection. The card
                                should have:
                            </p>
                            <ul>
                                <li>A dummy image</li>
                                <li>Should be selectable by clicking the whole card</li>
                                <li>Display the airport code</li>
                                <li>Display the location city name</li>
                            </ul>
                            </section>
                            <div>
                                <Link to="/flights">Start your journey!</Link>
                            </div>
                        </article>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Search;