import React from 'react';
import Layout from './components/Layout';
import './AppStyles.css';
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <Layout>

            </Layout>       
            );
    }
};

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);