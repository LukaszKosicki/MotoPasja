import Lightbox from 'react-lightbox-component';
import React from 'react';

export default class DisplayImages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <div>  
                {
                    this.props.images.length > 0 &&
                <Lightbox images = { this.props.images } />
                }
                {
                    this.props.images.length == 0 &&
                    <h4>Brak zdjęć</h4>
                }
            </div>
            );
    }
}