import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import RegistrationCRUD from '../../common/information/RegistrationCRUD';
import BlogModel from '../create/BlogModel';
import $ from 'jquery';
import RatingStars from '../../common/RatingStars';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            title: "",
            content: "",
            edit: false,
            rating: 0
        };
    }

    static getDerivedStateFromProps(props, state) {
        const imgs = [];
        for (var i = 0; i < props.images.length; i++) {
            var sr = props.images[i].fileName;
            imgs.push({ src: sr });
        }
        return {
            images: imgs
        };
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            content: this.props.contents
        });
        console.log(this.props);
    }
 
    edit = () => {
        this.setState({
            edit: true
        });
    }

    getTitle = (text) => {
        this.setState({
            title: text
        });
    }

    getContent = (text) => {
        this.setState({
            content: text
        });
    }

    cancelEdit = () => {
        this.setState({
            edit: false,
            title: this.props.title,
            content: this.props.contents
        });
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    updateBlog = (title, contents) => {
        if (title !== this.props.title || contents !== this.props.contents) {
            var blog = {
                id: this.props.id,
                title: title,
                contents: contents
            };

            $.ajax({
                url: "blog/updateBlog",
                type: "patch",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(blog),
                success: (data) => {
                    if (data === true) {
                        this.props.getBlog();
                        this.setState({
                            edit: false
                        });
                    }
                }
            });
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
                    <RegistrationCRUD informations={[
                        "Autor: " + this.props.author,
                        "Data dodania: " + this.props.dateOfAddition,
                        "Ostatnia aktywność: " + this.props.editingDate]}
                        edit={this.edit}
                        isAuthor={this.props.isAuthor}
                    />
                    <h1>{this.props.title}</h1>
                    <p>{this.props.contents}</p>
                    <div style={containerDiv}>
                        <div style={lightboxDiv}>
                            <Lightbox
                                images={this.state.images} />
                        </div>
                        <RatingStars 
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            averageRating={this.props.averageRating}
                            numberOfRatings={this.props.numberOfRatings}
                            />
                    </div>
                    <hr />
                </div>
            );
        }
    }
}