import React from 'react';
import { Container } from 'reactstrap';
import Navbar from '../../src/components/Navbar';
import { Route, HashRouter } from "react-router-dom";
import GetBlogs from './blog/blogsList/GetBlogs';
import ReadBlog from './blog/read/ReadBlog';
import CreateBlog from './blog/create/CreateBlog';

var containerStyles = {
    textAlign: 'center',
    marginTop: '30px'
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
            </Container>
        </div>
    </HashRouter>
    );