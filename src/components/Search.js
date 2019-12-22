import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Header from './Header';
import ListItem from './ListItem';
import airports from '../data/routes.json';

const ButtonSearch = (props) => {

    const org = props.origin.code;
    const dest = props.destination.code;
    const path = `/flights?org=${org}&dest=${dest}`;

    return (
        <Link to={path} className='btn btn-primary'>
            Start your journey!
        </Link>
    )
}

class Search extends Component {

    constructor (props) {
        super(props);
        this.state = {
            airports: airports.routes,
            filtered: airports.routes,
            airportSelected: null,
            destination: null
        }
        window.airports = airports.routes;
    }

    onClickOriginAirportHandler (airport) {
        console.log ('origin:', airport);
        this.setState({
            airportSelected: airport,
            destination: null
        });
    }

    onClickDestinationAirportHandler (destination) {
        console.log('destination', destination);
        this.setState({
            destination: destination
        })
    }

    normalize (term) {
        return term.toLocaleLowerCase().trim();
    }

    searchInputHandler (e) {
        const searchTerm = this.normalize(e.target.value);
        let filtered = this.state.airports;
        if (searchTerm !== null || searchTerm !== "") {
            filtered = filtered.filter( airport => {
                const cityNormalized = this.normalize(airport.location.cityName);
                const codeNormalized = this.normalize(airport.code);
                return cityNormalized.includes(searchTerm) || codeNormalized.includes(searchTerm)
            });
        }
        this.setState({
            filtered
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
                <Header />
                <Row className="header">
                    <Col>
                        <h2>Select your {isOrigin ? 'origin' : 'destination'}</h2>
                    </Col>
                </Row>
                <Row className="aiportInformation">
                    <Col>
                        <section>
                            <p>Please, search an origin airport</p>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Airport's location or code"
                                    aria-label="Airport's location or code"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.searchInputHandler(e)}
                                />                                
                            </InputGroup>
                            <p>or..</p>                            
                            <p>Choose your origin airport.</p>
                            <ul className="list-unstyled">
                                {
                                    this.state.filtered.map( airport => 
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
                            <div>
                                {
                                    this.state.destination ? 
                                        <ButtonSearch 
                                            origin={this.state.airportSelected}
                                            destination={this.state.destination}  
                                        />
                                    :
                                        ''
                                }
                            </div>
                        </Col>
                    
                </Row>
                <hr />
                <Row>                    
                    <Col>
                        <article>
                            <h3>About select your {isOrigin ? 'origin' : 'destination'}</h3>
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