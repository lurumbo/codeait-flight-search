import React, {Component} from 'react';
import FlightsContext from './FlightsContext';
import flightsCOR from '../data/epa-cor.json';
import flightsMDZ from '../data/epa-mdz.json';
import airports from '../data/routes.json';

class FlightsDataProvider extends Component {

    constructor (props) {
        super(props);
        this.state = {
            airports: airports.routes,
            airportsFiltered: airports.routes,
            flights: flightsCOR.flights.concat(flightsMDZ.flights),
            airportOriginSelected: null,
            airportDestinationSelected: null,
            originFlights: null,
            destinationFlights: null,
            outboundFlightNo: null,
            inboundFlightNo: null,
            outboundFlight: null,
            inboundFlight: null,
            airportOriginActive: null
        }
    }

    /**
     * Select the origin airport in Search Screen
     * @param {String} origin 
     */
    onClickOriginAirportHandler(origin, index) {
        console.log ('origin:', origin);
        this.setState({
            airportOriginSelected: origin,
            airportDestinationSelected: null,
            //airportOriginActive: index
        });
    }

    /**
     * Select the destination airport in Search Screen
     * @param {String} destination 
     */
    onClickDestinationAirportHandler (destination) {
        console.log('destination', destination);

        const fligths = this.state.flights;
        const origin = this.state.airportOriginSelected;

        const originFlights = fligths.filter( fligth => {
            return fligth.origin === origin.code && fligth.destination === destination.code
        } );
        const destinationFlights = fligths.filter( fligth => {
            return fligth.origin === destination.code && fligth.destination === origin.code
        });

        this.setState({
            airportDestinationSelected: destination,
            originFlights,
            destinationFlights
        })
    }

    /**
     * Normalize a string
     * @param {String} term 
     */
    normalize (term) {
        return term.toLocaleLowerCase().trim();
    }

    /**
     * Filters the airports list when the user type a character into the text input
     * @param {event} e 
     */
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
            airportsFiltered: filtered            
        });
    }

    /**
     * Select origin flight in Flights Screen 
     * @param {*} flight 
     */
    onClickOutboundFlightHandler (flight) {
        this.setState({
            outboundFlightNo: flight.flightNo,
            outboundFlight: flight
        });
    }

    /**
     * Select destination flight in Flights Screen
     * @param {*} flight 
     */
    onClickInboundFlightHandler (flight) {
        this.setState({
            inboundFlightNo: flight.flightNo,
            inboundFlight: flight
        });
    }

    render () {
        return (
            <FlightsContext.Provider
                value={{
                    state: this.state,
                    onClickOriginAirportHandler: (airport) => { this.onClickOriginAirportHandler(airport) },
                    onClickDestinationAirportHandler: (destination) => { this.onClickDestinationAirportHandler(destination)},
                    searchInputHandler: (e) => { this.searchInputHandler(e)},
                    onClickOutboundFlightHandler: (flight) => { this.onClickOutboundFlightHandler(flight)},
                    onClickInboundFlightHandler: (flight) => { this.onClickInboundFlightHandler(flight)},
                }}
            >
                {this.props.children}
            </FlightsContext.Provider>
        )
    }

}

export default FlightsDataProvider;