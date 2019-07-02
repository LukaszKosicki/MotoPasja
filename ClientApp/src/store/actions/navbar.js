import { connect } from "react-redux";
import Navbar from "../../components/Navbar";

function mapStateToProps(state) {
    return {
        isOpen: state.isOpen
    };
}

//akcje
var show_hidden_menu = { type: "show_hidden_menu" };

function mapDispatchToProps(dispatch) {
    return {
        showHiddenMenu: function () {
            return dispatch(show_hidden_menu);
        }
    };
}

const ReduxNavbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);

export default ReduxNavbar;