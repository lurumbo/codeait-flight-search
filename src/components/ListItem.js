import React, {Component} from 'react';
import Media from 'react-bootstrap/Media';
import image from  './airport-24.png'

class ListItem extends Component {

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
                    <span className="airport__code">{this.props.code}</span> | <b>{this.props.location}</b>
                </Media.Body>
            </Media>
        )
    }

}

export default ListItem;