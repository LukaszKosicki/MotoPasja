import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import RegistrationCRUD from '../../common/information/RegistrationCRUD';
import $ from 'jquery';
import BlogModel from '../create/BlogModel';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            edit: false
        };
    }

    componentDidMount() {
        const imgs = [];
        for (var i = 0; i < this.props.images.length; i++) {
            var sr = this.props.images[i].fileName;
            imgs.push({ src: sr });
        }
        this.setState({
            images: imgs
        });
    }

    deletePost = () => {
        $.ajax({
            url: "post/deletePost/?postId=" + this.props.id,
            method: 'delete',
            success: (result) => {
                this.props.delete(this.props.id);
            }
        });
    }

    updatePost = (title, contents) => {
        var post = {
            id: this.props.id,
            title: title,
            contents: contents,
            blogModelId: this.props.blogModelId
        };

        $.ajax({
            url: "post/updatePost",
            type: "patch",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(post),
            success: (data) => {
                if (data === true) {
                    this.setState({
                        edit: false
                    });
                }
            }
        });
    }

    edit = () => {
        this.setState({
            edit: true
        });
    }

    render() {
        var contentsDiv = {
            textAlign: 'left'
        };
        if (this.state.edit) {
            return (
                <div>
                    <h2>Edycja postu</h2>
                    <BlogModel
                        modelId={this.props.id}
                        images={this.props.images}
                        title={this.props.title}
                        content={this.props.contents}
                        model={'post'}
                        send={this.updatePost}
                        />
                </div>
                );
        } else {
            return (
                <div>
                    <div>
                        <RegistrationCRUD informations={[
                            "Autor: " + this.props.author,
                            "Data dodania: " + this.props.dateOfAddition,
                            "Ostatnia aktywność: " + this.props.editingDate]}
                            delete={this.deletePost}
                            edit={this.edit}
                        />
                        <h2>{this.props.title}</h2>
                        <div style={contentsDiv}>
                            <p>{this.props.contents}</p>
                        </div>
                    </div>
                    <Lightbox images={this.state.images} />
                    <hr />
                </div>
            );
        }
    }
}