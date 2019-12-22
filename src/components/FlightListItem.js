import React, {Component} from 'react';
import Media from 'react-bootstrap/Media';
import image from  './airport-24.png';
import moment from 'moment';

class FlightListItem extends Component {

    render () {
        return (
            <Media 
                as="li" 
                className="airport"
                onClick={this.props.onClick}
            >
                <img
                    width={24}
                    height={24}
                    className="mr-1"
                    src={image}
                    alt="airport icon"
                />
                <Media.Body>
                    <div>
                        <b>{this.props.code}</b> | <b>{this.props.location}</b>
                    </div>
                    <div>
                        <ul>
                            <li>Departure: {moment(this.props.departure).format('YYYY/MM/DD, hh:mm:ss')} hs</li>
                            <li>Arrival: {moment(this.props.arrival).format('YYYY/MM/DD, hh:mm:ss')} hs</li>
                            <li>Price: {this.props.price} ${this.props.currency}</li>
                        </ul>
                    </div>
                </Media.Body>
            </Media>
        )
    }

}

export default FlightListItem;