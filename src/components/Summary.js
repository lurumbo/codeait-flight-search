import React, { Component } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import moment from 'moment';
import FlightsContext from './FlightsContext';
import Header from './Header';
import imageASC from './airport-24-asc.png';
import imageDESC from './airport-24-desc.png';


const SummaryCard = (props) => {

    const depatureDay = moment(props.departure).format('YYYY/MM/DD');
    const depatureTime = moment(props.departure).format('hh:mm:ss');

    const arrivalTime = moment(props.arrival).format('hh:mm:ss');

    const duration = moment.duration(moment(props.arrival).diff(moment(props.departure)));
    const hours = duration.asHours();

    const image = (props.type === "OUTBOUND") ? imageASC : imageDESC;

    return  (
        <Card bg="light">
            <Card.Header> 
                <Image src={image} />
                <b> {props.type} </b> 
                {depatureDay}
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {props.originCityName} > {props.destinationCityName} 
                </Card.Title>
                <Card.Text>
                    <b>{props.originCode}</b> {depatureTime} hs
                    <br/>
                    <span>{props.airportOut?.description}</span>
                </Card.Text>
                <Card.Text>
                    <b>{props.destinationCode}</b> {arrivalTime} hs
                    <br/>
                    <span>{props.airportInb?.description}</span>
                </Card.Text>
                <Card.Text>
                    Duration {hours} hs
                </Card.Text>
                <Card.Text>
                    Price {props.currency} {props.price}
                </Card.Text>                
            </Card.Body>
        </Card>
    );
}


class Summary extends Component {

    static contextType = FlightsContext;

    render () {

        const airportOut = this.context.state.airportOriginSelected;
        const airportInb = this.context.state.airportDestinationSelected;
        const outboundFlight = this.context.state.outboundFlight;
        const inboundFlight = this.context.state.inboundFlight;

        return (
            <Container>
                <Header to="/flights" label="Go back to Flights" />
                <Row className="section__container">
                    <Col>
                        <h2>Itinerary</h2>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SummaryCard 
                            type="OUTBOUND"
                            airportOut={airportOut}
                            airportInb={airportInb}
                            departure={outboundFlight.departureDate}
                            arrival={outboundFlight.arrivalDate}
                            originCityName={airportOut.location.cityName}
                            destinationCityName={airportInb.location.cityName}
                            originCode={outboundFlight.origin}
                            destinationCode={outboundFlight.destination}
                            flightNo={outboundFlight.flightNo}
                            price={outboundFlight.fares[0].prices.afterTax}
                            currency={outboundFlight.currency}
                        />
                    </Col>
                    <Col>
                        <SummaryCard 
                            type="INBOUND"
                            airportOut={airportInb}
                            airportInb={airportOut}
                            departure={inboundFlight.departureDate}
                            arrival={inboundFlight.arrivalDate}
                            originCityName={airportInb.location.cityName}
                            destinationCityName={airportOut.location.cityName}
                            originCode={inboundFlight.origin}
                            destinationCode={inboundFlight.destination}
                            flightNo={inboundFlight.flightNo}
                            price={inboundFlight.fares[0].prices.afterTax}
                            currency={inboundFlight.currency}
                        />
                    </Col>                
                </Row>
                <Row>
                    <Col>
                        <p>Enjoy your trip!</p>
                    </Col>
                </Row>
            </Container>
        )

    }

}

export default Summary