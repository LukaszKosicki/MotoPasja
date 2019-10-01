import React from 'react';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { getPostsFromServer } from "../../../store/actions/post";

class ImageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '/icons/addImage.png',
            loadDiv: 'none'
        };
    }

    componentDidMount() {
        if (this.props.path != undefined) {
            this.setState({
                src: this.props.path
            });
        }
    }

    displayImage = (evt) => {
        var fr = new FileReader();
        fr.readAsDataURL(evt.target.files[0]);
        fr.addEventListener('load', () => {
            this.setState({
                src: fr.result
            });
        });

        this.sendImage(evt);
    }

    sendImage = (e) => {
        var formData = new FormData();

        formData.append("image", e.target.files[0]);
        formData.append("modelId", String(this.props.modelId).replace(/:/g, ';'));
        formData.append("fileName", this.props.fileName);
        formData.append("model", this.props.model);

        this.setState({
            loadDiv: 'block'
        });

        fetch("image/uploadImage", {
            method: "post",
            body: formData
        })
            .then(res => {
                if (typeof this.props.modelId === 'number') {
                    if (this.props.model === 'blog') {
                        this.props.getBlog();
                    } else if (this.props.model === 'post') {
                        this.props.getPosts(this.props.blog.blogId);
                    }
                };
                this.setState({
                    loadDiv: 'none'
                })
            })
    }

    deleteImage = () => {
        var formData = new FormData();

        formData.append("fileName", this.props.fileName);
        formData.append("modelId", this.props.modelId);
        formData.append("model", this.props.model);

        fetch("image/deleteImage", {
            method: "delete",
            body: formData
        })
            .then(res => {
                this.setState({
                    src: '/icons/addImage.png'
                })
                if (typeof this.props.modelId === 'number') {
                    if (this.props.model === 'blog') {
                        this.props.getBlog();
                    } else if (this.props.model === 'post') {
                        this.props.getPosts(this.props.blog.blogId);
                    }
                }
            })
    }

    render() {
        var mainDiv = {
            width: '120px',
            height: '120px',
            padding: '10px',
            border: 'solid 1px',
            position: 'relative',
            cursor: 'pointer',
            margin: '5px 5px 5px 5px',
            display: 'inline-block'
        };
        var labelStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginBottom: '0px',
            cursor: 'pointer'
        };
        var inputStyles = {
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
        };
        var imgStyles = {
            maxWidth: '100px',
            maxHeight: '100px'
        };
        var loadDivStyles = {
            width: '100%',
            height: '100%',
            backgroundColor: '#b3bbc3',
            position: 'absolute',
            zIndex: '1000',
            left: '0px',
            top: '0px',
            opacity: '0.8',
            display: this.state.loadDiv 
        };
        var delButtonStyles = {
            zIndex: 100000,
            left: '50%',
            top: '50%',
            opacity: '0.6',
            textAlign:'center',
            transform: 'translate(-50%, -50%)',
            position: 'absolute'
        };
        return (
            <div style={mainDiv}>
                {
                    ((this.state.src !== '/icons/addImage.png') && (this.state.loadDiv !== 'block')) &&
                    <div style={delButtonStyles}>
                        <Button onClick={this.deleteImage} color="danger">Usuń</Button>
                    </div>
                }
                <div>
                    <div style={loadDivStyles}>
                    </div>
                    <input id={this.props.id} onChange={this.displayImage} style={inputStyles} type='file' />
                    <label htmlFor={this.props.id} style={labelStyles}>
                        <img style={imgStyles} src={this.state.src} />
                    </label>
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getPosts: blogId => dispatch(getPostsFromServer(blogId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageBox);