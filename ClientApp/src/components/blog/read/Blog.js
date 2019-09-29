import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import BlogModel from '../create/BlogModel';
import $ from 'jquery';
import RatingStars from '../../common/RatingStars';
import BlogInformation from "./BlogInformation";
import { connect } from "react-redux";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }

    edit = () => {
        this.setState({
            edit: true
        });
    }
   
    cancelEdit = () => {
        this.setState({
            edit: false,
            title: this.props.title,
            content: this.props.contents
        });
    }

    updateBlog = (title, contents) => {
        if (title !== this.props.title || contents !== this.props.contents) {
            var blog = {
                id: this.props.id,
                title: title,
                contents: contents
            };

            fetch("blog/updateBlog", {
                method: "patch",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp) {
                        this.props.getBlog();
                        this.setState({
                            edit: false
                        });
                    }
                })
        } else {
            this.setState({
                edit: false
            });
        }
    }

    render() {
        var containerDiv = {
            textAlign: 'left'
        };
        var lightboxDiv = {
            textAlign: 'center'
        };
        
        if (this.state.edit) {
            return (
                <div>
                    <h1>Edycja blogu</h1>
                    <BlogModel
                        modelId={this.props.id}
                        images={this.props.images}
                        title={this.props.title}
                        content={this.props.contents}
                        send={this.updateBlog}
                        anuluj={this.cancelEdit}
                        getBlog={this.props.getBlog}
                        edit={true}
                        model={'blog'}
                    />
                    <hr />
                </div>
            );
        } else {
            return (
                <div>
                    <BlogInformation   
                        authorAvatar={this.props.authorAvatar}
                        author={this.props.author}
                        dateOfAddition={this.props.dateOfAddition}
                        dateOfLastEdition={this.props.blog.editingDate}
                        edit={this.edit}
                    />
                    <h1>{this.props.title}</h1>
                    <p>{this.props.contents}</p>
                    <div style={containerDiv}>
                        <div style={lightboxDiv}>
                            <Lightbox
                                images={this.props.images} />
                        </div>
                        <RatingStars 
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            averageRating={this.props.blog.averageRating}
                            numberOfRatings={this.props.blog.numberOfRatings}
                            />
                    </div>
                    <hr />
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Blog);