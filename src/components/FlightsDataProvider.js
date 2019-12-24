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
            airportDestinationSelected: null
        }
    }

    /**
     * Select the origin airport in Search Screen
     * @param {String} destination 
     */
    onClickOriginAirportHandler(airport) {
        console.log ('origin:', airport);
        this.setState({
            airportSelected: airport,
            destination: null
        });
    }

    /**
     * Select the destination airport in Search Screen
     * @param {String} destination 
     */
    onClickDestinationAirportHandler (destination) {
        console.log('destination', destination);
        this.setState({
            destination: destination
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
        })
    }

    render () {
        return (
            <FlightsContext.Provider
            value={{
                state: this.state,
                onClickOriginAirportHandler: (airport) => { this.onClickOriginAirportHandler(airport) },
                onClickDestinationAirportHandler: (destination) => { this.onClickDestinationAirportHandler(destination)},
                searchInputHandler: (e) => { this.searchInputHandler(e)},
            }}
            >
                {this.props.children}
            </FlightsContext.Provider>
        )
    }

}

export default FlightsDataProvider;