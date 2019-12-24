import React, {Component} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FlightsContext from './FlightsContext';
import Header from './Header';
import FlightListItem from './FlightListItem';

const Button = (props) => {

    const out = props.outbound;
    const inb = props.inbound;
    const path = `/${props.to}?out=${out}&inb=${inb}`;

    return (
        <Link to={path} className='btn btn-primary'>
            {props.text}
        </Link>
    )
}


class Flights extends Component {

    static contextType = FlightsContext;

    render () {

        console.log(this.context)

        return (
            <Container>
                <Header />
                <Row>
                    <Col>
                        <h2>Choose your outbound flight from {this.context.state.airportOriginSelected.location.cityName} to {this.context.state.airportDestinationSelected.location.cityName} </h2>
                        <p>List outbound flights...</p>
                        <ul className="list-unstyled">
                            {
                                this.context.state.originFlights.map( origin => 
                                    <FlightListItem 
                                        type="OUTBOUND"
                                        code={origin.origin}
                                        location={this.context.state.airportOriginSelected.location.cityName}
                                        departure={origin.departureDate}
                                        arrival={origin.arrivalDate}
                                        price={origin.fares[0].prices.afterTax}
                                        currency={origin.currency}
                                        key={origin.id}
                                        onClick={() => this.context.onClickOutboundFlightHandler(origin)}
                                    />
                                )
                            }
                        </ul>
                    </Col>
                    <Col>
                        <h2>Choose your inbound flight from {this.context.state.airportDestinationSelected.location.cityName} to {this.context.state.airportOriginSelected.location.cityName}</h2>
                        <p>List inbound flights...</p>
                        <ul className="list-unstyled">
                            {
                                this.context.state.destinationFlights.map( destination => 
                                    <FlightListItem 
                                        type="INBOUND"
                                        code={destination.origin}
                                        location={this.context.state.airportDestinationSelected.location.cityName}
                                        departure={destination.departureDate}
                                        arrival={destination.arrivalDate}
                                        price={destination.fares[0].prices.afterTax}
                                        currency={destination.currency}
                                        key={destination.id}
                                        onClick={() => this.context.onClickInboundFlightHandler(destination)}
                                    />
                                )
                            }
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            this.context.state.outboundFlightNo && this.context.state.inboundFlightNo ?
                                <Button 
                                    to="summary" 
                                    outbound={this.context.state.outboundFlightNo}
                                    inbound={this.context.state.inboundFlightNo}
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