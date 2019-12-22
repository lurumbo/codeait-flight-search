import React, {Component} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import flightsCOR from '../data/epa-cor.json';
import flightsMDZ from '../data/epa-mdz.json';
import FlightListItem from './FlightListItem';
import airports from '../data/routes.json';
const queryString = require('query-string');

const Button = (props) => {

    const org = props.outbound;
    const dest = props.inbound;
    const path = `/${props.to}?org=${org}&dest=${dest}`;

    return (
        <Link to={path} className='btn btn-primary'>
            {props.text}
        </Link>
    )
}


class Flights extends Component {

    constructor (props) {
        super(props);
        const params = queryString.parse(this.props.location.search);
        const flights = flightsCOR.flights.concat(flightsMDZ.flights);
        const origins = flights.filter(flight => flight.origin === params.org && flight.destination === params.dest);
        const destinations = flights.filter(flight => flight.origin === params.dest && flight.destination === params.org);
        const orgAir = airports.routes.filter(airport => airport.code === params.org)[0];
        const destAir = airports.routes.filter(airport => airport.code === params.dest)[0];
        this.state = {
            orgCode: params.org,
            destCode: params.dest,
            outbound: null,
            inbound: null,
            flights,
            origins,
            destinations,
            orgAir,
            destAir,
        }
    }

    onClickOutboundFlightHandler (flight) {
        this.setState({
            outbound: flight.flightNo
        })
    }

    onClickInboundFlightHandler (flight) {
        this.setState({
            inbound: flight.flightNo
        })
    }

    render () {

        console.log(this.state)
        //console.log( this.state.origins[0].fares[0].prices.afterTax)

        return (
            <Container>
                <Header />
                <Row>
                    <Col>
                        <h2>Choose your outbound flight from {this.state.orgAir.location.cityName} to {this.state.destAir.location.cityName} </h2>
                        <p>List outbound flights...</p>
                        <ul className="list-unstyled">
                            {
                                this.state.origins.map( origin => 
                                    <FlightListItem 
                                        code={origin.origin}
                                        location={this.state.orgAir.location.cityName}
                                        departure={origin.departureDate}
                                        arrival={origin.arrivalDate}
                                        price={origin.fares[0].prices.afterTax}
                                        currency={origin.currency}
                                        key={origin.id}
                                        onClick={() => this.onClickOutboundFlightHandler(origin)}
                                    />
                                )
                            }
                        </ul>
                    </Col>
                    <Col>
                        <h2>Choose your inbound flight from {this.state.destAir.location.cityName} to {this.state.orgAir.location.cityName}</h2>
                        <p>List inbound flights...</p>
                        <ul className="list-unstyled">
                            {
                                this.state.destinations.map( destination => 
                                    <FlightListItem 
                                        code={destination.origin}
                                        location={this.state.destAir.location.cityName}
                                        departure={destination.departureDate}
                                        arrival={destination.arrivalDate}
                                        price={destination.fares[0].prices.afterTax}
                                        currency={destination.currency}
                                        key={destination.id}
                                        onClick={() => this.onClickInboundFlightHandler(destination)}
                                    />
                                )
                            }
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            this.state.outbound && this.state.inbound ?
                                <Button 
                                    to="/summary" 
                                    outbound={this.state.outbound}
                                    inbound={this.state.inbound}
                                    text="Finish"
                                    className="btn btn-primary"
                                />
                            :
                                ''
                        }
                            
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <article>
                            <h3> About choose your outbound flight to Mendoza</h3>
                            <section>
                            <p>
                                Here it should be a flight list with all available outbound flights
                                for the selected trip. Each list item should have:
                            </p>
                            <ul>
                                <li>A dummy image</li>
                                <li>Should be selectable by clicking the whole card</li>
                                <li>Display the airport code</li>
                                <li>Display the location city name</li>
                                <li>Display the flight times and duration</li>
                                <li>Display the price for the leg</li>
                            </ul>
                            </section>
                        </article>
                        <article>
                            <h3>About choose your inbound flight to Buenos Aires</h3>
                            <section>
                            <p>
                                Here it should be a flight list with all available inbound flights
                                for the selected trip.
                            </p>
                            <ul>
                                <li>A dummy image</li>
                                <li>Should be selectable by clicking the whole card</li>
                                <li>Display the airport code</li>
                                <li>Display the location city name</li>
                                <li>Display the flight times and duration</li>
                                <li>Display the price for the leg</li>
                            </ul>
                            </section>
                        </article>
                    </Col>
                </Row>
            </Container>
        )
    }


}

export default Flights;