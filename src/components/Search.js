import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import FlightsContext, {FlightsConsumer} from './FlightsContext';
import Header from './Header';
import ListItem from './ListItem';

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

const CardDescription = () => (
    <Row>                    
        <Col>
            <article>
                <h3>About select your origin</h3>
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
                <br/>
            </article>
        </Col>
    </Row>
);

const OriginAirportsList = () => (
    <FlightsConsumer>        
        {            
            context => (
                <ul className="list-unstyled">
                    {                                                
                        context.state.airportsFiltered.map( airport => 
                            <ListItem 
                                airport={airport}
                                location={airport.location.cityName} 
                                code={airport.code} 
                                key={airport.code}
                                onClick={() => context.onClickOriginAirportHandler(airport)}
                            />
                        )
                    }
                </ul>
            )
        }
    </FlightsConsumer>
)

const DestinationAirportsList = () => (
    <FlightsConsumer>        
        {            
            context => (
                <ul className="list-unstyled">
                    {                                                
                        context.state.airportOriginSelected?.destinations.map( destination => 
                            <ListItem 
                                airport={destination}
                                location={destination.location.cityName} 
                                code={destination.code} 
                                key={destination.code}
                                onClick={() => context.onClickDestinationAirportHandler(destination)}
                            />
                        )
                    }
                </ul>
            )
        }
    </FlightsConsumer>
);

class Search extends Component {

    static contextType = FlightsContext;

    render () {

        console.log(this.context)

        const airport = this.context.state.airportOriginSelected;
        const destinationMessage = this.context.state.airportOriginSelected 
                ? `Destinations available for ${airport.location.cityName} aiport.` 
                : `Destinations available for selected aiport.`;

        return (
            <Container>
                <Header to="/" label="Go back to Home" />
                <Row className="subheader__container">
                    <h2>Select your origin and destination airports</h2>
                </Row>
                <Row className="section__container">
                    <Col>                        
                        <section>                        
                            <p>Please, search an origin airport</p>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Airport's location or code"
                                    aria-label="Airport's location or code"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.context.searchInputHandler(e)}
                                />                                
                            </InputGroup>
                            <p>or..</p>                            
                            <p>Choose your origin airport.</p>
                            <OriginAirportsList />                        
                        </section> 
                    </Col>
                    <Col>
                        <p>{destinationMessage}</p>                                                      
                        <DestinationAirportsList />                        
                    </Col>
                </Row>
                <Row className="action-button__container">
                    <Col>
                    {
                                this.context.state.airportDestinationSelected ? 
                                    <ButtonSearch 
                                        origin={this.context.state.airportOriginSelected}
                                        destination={this.context.state.airportDestinationSelected}  
                                    />
                                :
                                    ''
                            }
                    </Col>
                </Row>
                <hr />
                <CardDescription />
            </Container>
        )
    }

}

export default Search;