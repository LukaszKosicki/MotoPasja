import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import $ from 'jquery';
import BlogModel from '../create/BlogModel';
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import PostInformation from "./PostInformation";
import { setPosts, getPostsFromServer } from "../../../store/actions/post";
import { setEditingDate } from "../../../store/actions/blog";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    
    deletePost = () => {
        fetch("post/deletePost/?postId=" + this.props.id, {
            method: "delete"
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp) {
                    this.props.post.posts.forEach((item, index, arr) => {
                        if (item.id == this.props.id) {
                            arr.splice(index, 1);
                            this.props.setPosts(arr);
                           
                        }
                    });
                }
            })
    }

    updatePost = (title, contents) => {
        if (title !== this.props.title || contents !== this.props.contents) {
            var post = {
                id: this.props.id,
                title: title,
                contents: contents,
                blogModelId: this.props.blogModelId
            };

            fetch("post/updatePost", {
                method: "patch",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.success) {
                        this.props.getPosts(this.props.blogModelId);
                        this.props.setEditingDate(resp.editingDate);
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

    edit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }

    render() {
        var contentsDiv = {
            textAlign: 'left'
        };
        var editBtnDivStyles = {
            textAlign: "right"
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
                        edit={true}
                        anuluj={this.edit}
                    />
                    <hr />
                </div>
                );
        } else {
            return (
                <div>
                    {
                        this.props.user.user.userName === this.props.author &&
                        <div style={editBtnDivStyles}>
                            <Button type="button" color="link" onClick={this.deletePost}>Usuń</Button>
                            <Button type="button" color="link" onClick={this.edit}>Edytuj</Button>
                        </div>
                    }
                    <div>
                        <h2>{this.props.title}</h2>
                        <div style={contentsDiv}>
                            <p>{this.props.contents}</p>
                        </div>
                    </div>
                    <Lightbox images={this.props.images} />
                    <PostInformation
                        dateOfAddition={this.props.dateOfAddition}
                        editingDate={this.props.editingDate}
                        />
                    <hr />
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setPosts: posts => dispatch(setPosts(posts)),
    getPosts: blogId => dispatch(getPostsFromServer(blogId)),
    setEditingDate: date => dispatch(setEditingDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);