import React from 'react';
import ReactStars from 'react-stars';
import { FormText, Button } from 'reactstrap';
import RatingForm from "../common/RatingForm";
import Login from "../../containers/account/Login";
import { connect } from "react-redux";

class RatingStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            averageRating: 0,
            numberOfRatings: 0,
            voteCast: false,
            userRating: 0,
            showRatingForm: false,
            showLoginForm: false
        }
        this.getAverageRating();
        if (this.props.user.isOnline) {
            this.didTheUserVote();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.voteCast !== this.state.voteCast) {
            this.didTheUserVote();
        }
    }

    showHidenElement = (name) => {
        if (this.state[name]) {
            this.setState({
                [name]: false
            })
        } else {
            this.setState({
                [name]: true
            })
        }
    }

    didTheUserVote = () => {
        fetch("rating/didTheUserVote/?modelId=" + this.props.blog.blogId)
            .then(res => res.json())
            .then(res => {
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
                        <small className="my-link" onClick={() => this.showHidenElement("showRatingForm")}>
                            Zmień ocenę</small>
                    </div>
                )
            } else {
                return (
                    <div className="left-text">
                        <small className="my-link" name="showRatingForm" onClick={() => this.showHidenElement("showRatingForm")}>
                            Oceń blog</small>
                    </div>
                )
            }
        } else {
            return (
                <div className="left-text">
                    <small className="my-link" onClick={() => this.showHidenElement("showLoginForm")}>Zaloguj się,</small>
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
        var loginForm = {
            position: "fixed",
            zIndex: "4",
            top: "50%",
            left: "0px",
            transform: "translateY(-50%)",
            backgroundColor: "#f8f9fa",
            paddingTop: "10px",
            paddingBottom: "10px",
            width: "100%"
        };
        var btnAnulujLoginForm = {
            margin: "auto",
            display: "block",
            martinTop: "5px"
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
                {this.state.showLoginForm && !this.props.user.isOnline &&
                    <div style={loginForm}>
                        <Login />
                        <Button style={btnAnulujLoginForm} color="danger" type="button" onClick={() => this.showHidenElement("showLoginForm")}>Anuluj</Button>
                    </div>
                }
                {this.state.showRatingForm &&
                    <RatingForm
                    count={this.props.count}
                    value={this.state.averageRating}
                    size={this.props.size}
                    color2={this.props.color2}
                    modelId={this.props.blog.blogId}
                    getAverageRating={this.getAverageRating}
                    showHidenRatingForm={() => this.showHidenElement("showRatingForm")}
                    didTheUserVote={() => this.didTheUserVote()}
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