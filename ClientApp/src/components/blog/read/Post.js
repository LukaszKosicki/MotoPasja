import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import Information from '../../common/information/Information';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        const imgs = [];
        for (var i = 0; i < this.props.images.length; i++) {
            var sr = this.props.images[i].fileName;
            imgs.push({ src: sr });
        }
        this.setState({
            images: imgs
        });
    }

    render() {
        var contentsDiv = {
            textAlign: 'left'
        };
        return (
            <div>
                <div>
                    <Information informations={[
                        "Autor: " + this.props.author,
                        "Data dodania: " + this.props.dateOfAddition,
                        "Ostatnia aktywność: " + this.props.editingDate
                    ]} />
                    <h2>{this.props.title}</h2>
                    <div style={contentsDiv}>
                        <p>{this.props.contents}</p>
                    </div>
                </div>
                <Lightbox images={this.state.images} />
                <hr />
            </div>
            );
    }
}