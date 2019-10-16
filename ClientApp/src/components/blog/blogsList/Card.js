import React from 'react';
import { FormText, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { withRouter } from "react-router";
import "./Card.css";

class BlogCard extends React.Component {
    loadBlog = () => {
        this.props.history.push("/blog/" + this.props.idBlog);
    }

    render() {
        return (
            <Card onClick={this.loadBlog}>
                {this.props.miniature !== "" &&
                    <CardImg top width="100%" src={this.props.miniature} alt="Card image cap" />
                }
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                    <CardText>{this.props.text}</CardText>
                    <CardText className="cardInformation">
                        <img className="cardAvatar" src={this.props.authorAvatar} />
                        <div className="cardInformationText">
                            <FormText className="text-muted">Autor: {this.props.author}</FormText>
                            <FormText className="text-muted">Ostatnia aktywność: {this.props.lastEdition}</FormText>
                        </div>
                    </CardText>
                    </CardBody>
            </Card>           
            );
    }
}

export default withRouter(BlogCard);