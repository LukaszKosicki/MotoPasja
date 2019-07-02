import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import Information from '../../common/information/Information';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        const imgs = [];
        for (var i = 0; i < this.props.images.length; i++) {
            var sr = '/images/' + this.props.images[i].fileName;
            imgs.push({ src: sr });
        }
        this.setState({
            images: imgs
        });
    }

    render() {
        var containerDiv = {
            textAlign: 'left'
        };
        var lightboxDiv = {
            textAlign: 'center'
        };

        return (
            <div>
                <Information informations={[
                    "Autor: " + this.props.author,
                    "Data dodania: " + this.props.dateOfAddition,
                    "Ostatnia aktywność: " + this.props.editingDate
                ]} />
                <h1>{this.props.title}</h1>
                <p>{this.props.contents}</p>
                <div style={containerDiv}>
                    <div style={lightboxDiv}>
                        <Lightbox
                            images={this.state.images} />
                    </div>        
                </div>
                <hr/>
            </div>
            );
    }
}