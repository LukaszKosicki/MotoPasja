import React from 'react';

export default class ImageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '/icons/addImage.png'
        };
        this.sendImage = this.sendImage.bind(this);
    }
    changeImage(evt) {
        var fr = new FileReader();
        fr.readAsDataURL(evt.target.files[0]);
        fr.addEventListener('load', () => {
            this.setState({
                src: fr.result
            });
        }); 
    }
    sendImage(e) {
        var formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("fullTime", this.props.fullTime);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/blog/image/");
        xhr.send(formData);

        var fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.addEventListener('load', () => {
            this.setState({
                src: fr.result
            });
        }); 

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({
                    src: xhr.responseText.substr(1, xhr.responseText.length - 2)
                });
            }
        }
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
        return (
            <div style={mainDiv}>
                <div>
                    <input id={this.props.id} onChange={this.sendImage} style={inputStyles} type='file' />
                    <label htmlFor={this.props.id} style={labelStyles}>
                        <img style={imgStyles} src={this.state.src} />
                    </label>
                </div>
            </div>
            );
    }
}