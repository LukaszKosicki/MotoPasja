import React from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Button, FormText } from 'reactstrap';
import RatingForm from "../common/RatingForm";

class RatingStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            averageRating: 0,
            numberOfRatings: 0,
            voteCast: false,
            userRating: 0,
            showRatingForm: false
        }
        this.getAverageRating();
        if (this.props.user.isOnline) {
            this.didTheUserVote();
        }
    }

    showHidenRatingForm = () => {
        if (this.state.showRatingForm) {
            this.setState({
                showRatingForm: false
            })
        } else {
            this.setState({
                showRatingForm: true
            })
        }
    }

    didTheUserVote = () => {
        fetch("rating/didTheUserVote/?modelId=" + this.props.blog.blogId)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.voteCast) {
                    this.setState({
                        voteCast: res.voteCast,
                        userRating: res.rating,
                    })
                } else {
                    this.setState({
                        voteCast: false
                    })
                }
            })
    }



    votedOrNot = () => {
        if (this.props.user.isOnline) {
            if (this.state.voteCast) {
                return (
                    <div className="left-text">
                        <small className="my-block-element">Twoja ocena to: {this.state.userRating}</small>
                        <small className="my-link" onClick={this.showHidenRatingForm}>Zmień ocenę</small>
                    </div>
                )
            } else {
                return (
                    <div className="left-text">
                        <small className="my-link" onClick={this.showHidenRatingForm}>Oceń blog</small>
                    </div>
                )
            }
        } else {
            return (
                <div className="left-text">
                    <small className="my-link">Zaloguj się,</small>
                    <small className="my-block-element">aby ocenić blog!</small>
                </div>
                )
        }
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
                        edit={false}
                    />
                    <FormText>({this.state.numberOfRatings} głosów)</FormText>
                    {this.votedOrNot()}
                </div>
                {this.state.showRatingForm &&
                    <RatingForm
                    count={this.props.count}
                    value={this.state.averageRating}
                    size={this.props.size}
                    color2={this.props.color2}
                    modelId={this.props.blog.blogId}
                    getAverageRating={this.getAverageRating}
                    showHidenRatingForm={this.showHidenRatingForm}
                    />
                }
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(RatingStars);