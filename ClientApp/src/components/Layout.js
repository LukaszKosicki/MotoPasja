import React from 'react';
import { Container } from 'reactstrap';
import Navbar from '../../src/components/Navbar';
import { Route, HashRouter } from "react-router-dom";
import GetBlogs from './blog/blogsList/GetBlogs';
import ReadBlog from './blog/read/ReadBlog';
import CreateBlog from './blog/create/CreateBlog';
import Login from '../containers/account/Login';
import Register from '../containers/account/Register';
import MyProfile from "./user/Profile";
import Statement from "../components/Statement";
import ResetPassword from "../containers/account/ResetPassword";
import ConfirmEmail from "../containers/account/ConfirmEmail";
import Error from "./Error";

var containerStyles = {
    textAlign: 'center',
    marginTop: '56px'
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
                <Route path="/myProfile/:userName" component={MyProfile} />
                <Route path="/error" component={Statement} />
                <Route path="/success" component={Statement} />
                <Route path="/resetPassword" component={ResetPassword} />
                <Route path="/confirmEmail" component={ConfirmEmail} />
                <Route path="/error" component={Error} />
            </Container>
        </div>
    </HashRouter>
    );