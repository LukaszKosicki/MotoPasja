import React from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Button, FormText } from 'reactstrap';

class RatingStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            averageRating: 0,
            numberOfRatings: 0
        }
        this.getAverageRating();
    }

    ratingChanged = newRating => {
        this.setState({
            averageRating: newRating
        });
    }

    sendRatingToServer = () => {
        var rating = {
            blogModelId: this.props.blog.blogId,
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
                this.setState({
                    averageRating: ret.averageRating,
                    numberOfRatings: ret.numberOfRatings
                });
            })

        $.ajax({
            url: "rating/addRating",
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(rating),
            success: (data) => {
                this.getAverageRating();
            }
        });
    }

    getAverageRating = () => {
        fetch("rating/GetAverageRating/?blogId=" + this.props.blog.blogId)
            .then(resp => resp.json())
            .then(rat => {
                this.setState({
                    averageRating: rat.averageRating,
                    numberOfRatings: rat.numberOfRatings
                });
            })
    }

    render() {
        var mainDivStarsStyles = {
            textAlign: 'right'
        };
        var childDivStars = {
            display: 'inline-block'
        };
        return (
            <div style={mainDivStarsStyles}>
                <div style={childDivStars}>
                    <ReactStars
                        count={this.props.count}
                        value={this.state.averageRating}
                        size={this.props.size}
                        color2={this.props.color2}
                        onChange={this.ratingChanged}
                    />
                    <FormText>({this.state.numberOfRatings} głosów)</FormText>
                    <Button type="button" onClick={this.sendRatingToServer} color="link">Wyślij</Button>
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(RatingStars);