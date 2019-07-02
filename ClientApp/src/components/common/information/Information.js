import React from 'react';

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            informationDivDisplay: 'none'
        };
        this.pokaz = this.pokaz.bind(this);
        this.ukryj = this.ukryj.bind(this);
    }
    pokaz() {
        this.setState({
            informationDivDisplay: 'inline-block'
        });
    }

    ukryj() {
        this.setState({
            informationDivDisplay: 'none'
        });
    }

    render() {
        var mainDiv = {
            position: 'absolute',
            backgroundColor: 'white'
        };
        var small = {
            display: 'block'
        };
        var informationDiv = {
            padding: '5px',
            display: this.state.informationDivDisplay ,
            marginLeft: '20px',
            border: 'solid cornflowerblue',
            textAlign: 'left',
        };
        var small = {
            display: 'block'
        };
        var imgStyles = {
            position: 'absolute'
        };
        return (
            <div style={mainDiv}>
                <img onMouseOver={this.pokaz} onMouseOut={this.ukryj} style={imgStyles} src={process.env.PUBLIC_URL + '/icons/info.png'} />
                <div style={informationDiv}>
                    {this.props.informations.map((item, index) => {
                        return <small key={'informationSmall' + index} style={small}>{item}</small>
                    })
                    }

                </div>
            </div>
            );
    }
}