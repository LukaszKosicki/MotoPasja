import React from 'react';
import { Container } from 'reactstrap';
import ReduxNavbar from '../store/actions/navbar';
import { Route, HashRouter } from "react-router-dom";
import BlogsList from './blog/blogsList/BlogsList';
import ShowBlog from './blog/showBlog/ShowBlog';
import AddBlog from './blog/addBlog/AddBlog';

var containerStyles = {
    textAlign: 'center',
    marginTop: '30px'
};

export default props => (
    <HashRouter>
        <div>
            <div>
                <ReduxNavbar />
            </div>
            <Container style={containerStyles}>
                <Route path="/blogs" component={BlogsList} />
                <Route path="/blog/:id" component={ShowBlog} />
                <Route path="/newBlog" component={AddBlog} />
            </Container>
        </div>
    </HashRouter>
    );