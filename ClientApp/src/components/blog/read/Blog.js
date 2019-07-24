import React from 'react';
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import Information from '../../common/information/Information';
import { Button } from 'reactstrap';
import BlogModel from '../create/BlogModel';
import $ from 'jquery';

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            title: "",
            content: "",
            edit: false
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
/*
    componentDidUpdate(prevProps, prevState) {
        var update = false;
        if (this.props.images.length !== prevProps.images.length) {
            update = true;
        } else {
            for (var i = 0; i < this.props.images.length; i++) {
                if (this.props.images[i].src !== prevProps.images.src) {
                    update = true;
                }
            }
        }
      
        if (update) {
            const imgs = [];
            for (var i = 0; i < this.props.images.length; i++) {
                var sr = this.props.images[i].fileName;
                imgs.push({ src: sr });
            }
            this.setState({
                images: imgs
            });
        }
    }
       */
    componentDidMount() {
        this.setState({
            title: this.props.title,
            content: this.props.contents
        });
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

    updateBlog = (title, contents) => {
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
    }

    render() {
        var containerDiv = {
            textAlign: 'left'
        };
        var lightboxDiv = {
            textAlign: 'center'
        };
        var editButtonStyles = {
            padding: '0px'
        };
        var editDivStyles = {
            textAlign: 'right'
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
                    />
                    <hr />
                </div>
            );
        } else {
            return (
                <div>
                    <div style={editDivStyles}>
                        <Information informations={[
                            "Autor: " + this.props.author,
                            "Data dodania: " + this.props.dateOfAddition,
                            "Ostatnia aktywność: " + this.props.editingDate
                        ]} />
                        <Button style={editButtonStyles} onClick={this.edit} color="link">Edytuj</Button>
                    </div>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.contents}</p>
                    <div style={containerDiv}>
                        <div style={lightboxDiv}>
                            <Lightbox
                                images={this.state.images} />
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
    }
}