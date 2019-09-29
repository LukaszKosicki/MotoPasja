import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { notLogged } from "../store/actions/user";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        fetch("account/logout")
            .then(this.props.notLogged());
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">MotoPasja</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Blog
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={Link} to="/blogs">
                                        Wszystkie blogi
                                </DropdownItem>
                                <DropdownItem tag={Link} to="/newBlog">
                                    Nowy blog
                                </DropdownItem>
                                <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {this.props.isOnline &&
                                <NavItem>
                                    <NavLink tag={Link} to="/myProfile">Mój Profil</NavLink>
                                </NavItem>}
                            {!this.props.isOnline &&
                                <NavItem>
                                    <NavLink tag={Link} to="/login">Logowanie</NavLink>
                                </NavItem>}
                            {!this.props.isOnline &&
                                <NavItem>
                                    <NavLink tag={Link} to="/register">Rejestracja</NavLink>
                                </NavItem>}
                            {this.props.isOnline &&
                                <NavItem>
                                    <NavLink onClick={this.logout}>Wyloguj</NavLink>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isOnline: state.user.isOnline,
});

const mapDispatchToProps = dispatch => ({
    notLogged: () => dispatch(notLogged())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Example));