import React from 'react';
import { Container } from 'reactstrap';
import Navbar from '../../src/components/Navbar';
import { Route, HashRouter } from "react-router-dom";
import GetBlogs from './blog/blogsList/GetBlogs';
import ReadBlog from './blog/read/ReadBlog';
import CreateBlog from './blog/create/CreateBlog';
import Login from './account/Login';
import Register from './account/Register';
import MyProfile from "./user/Profile";
import Statement from "../components/Statement";
import EmailConfirmed from "./account/presentational/EmailConfirmed";
import UnconfirmedEmail from "../components/account/presentational/UnconfirmedEmail";
import ResetPassword from "../components/account/ResetPassword";

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
                <Route path="/emailConfirmed" component={EmailConfirmed} />
                <Route path="/unconfirmedEmail" component={UnconfirmedEmail} />
                <Route path="/resetPassword" component={ResetPassword} />
            </Container>
        </div>
    </HashRouter>
    );