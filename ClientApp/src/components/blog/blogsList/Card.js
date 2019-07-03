import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class BlogCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            srcImages: "images/aaa.jpg"
        };
    }

    componentDidMount() {
        if (this.props.images.length != 0) {
            this.setState({
                srcImages: this.props.images[0].fileName
            });
        }
    }

    render() {
        var cardStyles = {
            display: 'inline-block',
            color: 'black'
        };
        var cardTextStyles = {
            overflowY: 'scroll'
        };

        return (
            <NavLink to={"/blog/" + this.props.id} >
                <Card className="BlogCard" style={cardStyles}>
                    <input type="hidden" value={this.props.id} />
                    <CardImg top width="100%" src={this.state.srcImages} alt="Card image cap" />
                <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText className="cardTextContent" style={cardTextStyles}>{this.props.contents}</CardText>
                        <CardText className="cardTextSmall">
                        <small className="text-muted">{this.props.dateOfAddition}</small>
                    </CardText>
                </CardBody>
                </Card>
            </NavLink>
            );
    }
}