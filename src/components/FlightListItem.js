import React, {Component} from 'react';
import Media from 'react-bootstrap/Media';
import imageASC from  './airport-24-asc.png';
import imageDESC from  './airport-24-desc.png';
import moment from 'moment';

class FlightListItem extends Component {

    render () {

        const image = (this.props.type === "OUTBOUND") ? imageASC : imageDESC;
        const className = (this.props.isActive) ? `airport listitem_active` : `airport`;


        return (
            <Media 
                as="li" 
                className={className}
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
                        <span className="airport__code">{this.props.code}</span> | <b>{this.props.location}</b>
                    </div>
                    <div>
                        <ul>
                            <li>Departure: {moment(this.props.departure).format('YYYY/MM/DD, hh:mm:ss')} hs</li>
                            <li>Arrival: {moment(this.props.arrival).format('YYYY/MM/DD, hh:mm:ss')} hs</li>
                            <li>Price:  ${this.props.currency} {this.props.price}</li>
                        </ul>
                    </div>
                </Media.Body>
            </Media>
        )
    }

}

export default FlightListItem;