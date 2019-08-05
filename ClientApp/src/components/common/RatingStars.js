import React from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Button, FormText } from 'reactstrap';

class RatingStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.averageRating,
            numberOfRating: this.props.numberOfRatings
        };
    }

    getRating = (newRating) => {
        this.setState({
            rating: newRating
        });
    }

    sendRatingToServer = () => {
        var rating = {
            blogModelId: this.props.blog.blogId,
            rating: this.state.rating
        };

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
        $.ajax({
            url: "rating/GetAverageRating/?blogId=" + this.props.blog.blogId,
            type: "get",
      
            success: (data) => {
                console.log(data);
                this.setState({
                    rating: data
                });
            }
        });
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
                        value={this.state.rating}
                        size={this.props.size}
                        color2={this.props.color2}
                        onChange={this.getRating}
                    />
                    <FormText>({this.state.numberOfRating} głosów)</FormText>
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