﻿import React from 'react';
import { Container } from 'reactstrap';
import Navbar from '../../src/components/Navbar';
import { Route, HashRouter } from "react-router-dom";
import GetBlogs from './blog/blogsList/GetBlogs';
import ReadBlog from './blog/read/ReadBlog';
import CreateBlog from './blog/create/CreateBlog';
import Login from './account/Login';
import Register from './account/Register';
import MyProfile from "../components/user/MyProfile";
import Statement from "../components/Statement";

var containerStyles = {
    textAlign: 'center',
    marginTop: '80px'
};

export default props => (
    <HashRouter>
        <div>
            <div>
                <Navbar />
            </div>
            <Container style={containerStyles}>
                <Route path="/blogs" component={GetBlogs} />
                <Route path="/blog/:id" component={ReadBlog} />
                <Route path="/newBlog" component={CreateBlog} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/myProfile" component={MyProfile} />
                <Route path="/error" component={Statement} />
                <Route path="/success" component={Statement} />
            </Container>
        </div>
    </HashRouter>
    );