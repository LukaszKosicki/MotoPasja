import React from "react";
import ReactStars from 'react-stars';
import { Button } from "reactstrap";
import "./RatingForm.css";

export default class RatingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            averageRating: this.props.value
        };
    }

    ratingChanged = newRating => {
        this.setState({
            averageRating: newRating
        });
    }

    sendRatingToServer = () => {
        var rating = {
            blogModelId: this.props.modelId,
            rating: this.state.averageRating
        };

        fetch("rating/addRating", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating)
        })
            .then(resp => resp.json())
            .then(ret => {
                this.props.getAverageRating();
                this.props.showHidenRatingForm();
                this.props.didTheUserVote();
            })
    }

    render() {
        var ratingFormStyles = {
            zIndex: "1",
            position: "fixed",
            backgroundColor: "#f8f9fa",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        };
        var contentRatingFormStyles = {
            margin: "50px"
        };

        return (
            <div style={ratingFormStyles} className="ratingForm">
                <div style={contentRatingFormStyles} className="contentRatingForm">
                    <ReactStars
                        count={this.props.count}
                        value={this.state.averageRating}
                        size={this.props.size}
                        color2={this.props.color2}
                        onChange={this.ratingChanged}
                    />
                    <Button color="link" onClick={this.props.showHidenRatingForm} type="button">Anuluj</Button>
                    <Button color="link" type="button" onClick={this.sendRatingToServer}>Oceń</Button>
                </div>
            </div>
            )
    }
}