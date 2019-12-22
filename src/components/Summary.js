import React, { Component } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import moment from 'moment';
import Header from './Header';
import flightsCOR from '../data/epa-cor.json';
import flightsMDZ from '../data/epa-mdz.json';
import airports from '../data/routes.json';
import imageASC from './airport-24-asc.png';
import imageDESC from './airport-24-desc.png';
const queryString = require('query-string');


const SummaryCard = (props) => {

    const depatureDay = moment(props.departure).format('YYYY/MM/DD');
    const depatureTime = moment(props.departure).format('hh:mm:ss');

    const arrivalDay = moment(props.arrival).format('YYYY/MM/DD');
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

    constructor (props) {
        super(props);
        const params = queryString.parse(this.props.location.search);
        const flights = flightsCOR.flights.concat(flightsMDZ.flights);
        console.log(flights);
        const outbound = flights.filter(fligth => fligth.flightNo == params.out)[0];
        const inbound = flights.filter(fligth => fligth.flightNo == params.inb)[0];
        const airportOut = airports.routes.filter( airport => airport.code === outbound.origin)[0];
        const airportInb = airports.routes.filter( airport => airport.code === inbound.origin)[0];
        this.state = {
            outbound,
            inbound,
            airportOut,
            airportInb
        }
    }

    render () {

        console.log(this.state);

        return (
            <Container>
                <Header />
                <Row>
                    <Col>
                        <h2>Itinerary</h2>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SummaryCard 
                            type="OUTBOUND"
                            airportOut={this.state.airportOut}
                            airportInb={this.state.airportInb}
                            departure={this.state.outbound.departureDate}
                            arrival={this.state.outbound.arrivalDate}
                            originCityName={this.state.airportOut.location.cityName}
                            destinationCityName={this.state.airportInb.location.cityName}
                            originCode={this.state.outbound.origin}
                            destinationCode={this.state.outbound.destination}
                            flightNo={this.state.outbound.flightNo}
                            price={this.state.outbound.fares[0].prices.afterTax}
                            currency={this.state.outbound.currency}
                        />
                    </Col>
                    <Col>
                    <SummaryCard 
                            type="INBOUND"
                            airportOut={this.state.airportInb}
                            airportInb={this.state.airportOut}
                            departure={this.state.inbound.departureDate}
                            arrival={this.state.inbound.arrivalDate}
                            originCityName={this.state.airportInb.location.cityName}
                            destinationCityName={this.state.airportOut.location.cityName}
                            originCode={this.state.inbound.origin}
                            destinationCode={this.state.inbound.destination}
                            flightNo={this.state.inbound.flightNo}
                            price={this.state.inbound.fares[0].prices.afterTax}
                            currency={this.state.inbound.currency}
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