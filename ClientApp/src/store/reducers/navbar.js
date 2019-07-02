
function navbar(state, action) {
    if (state === undefined) {
        return { isOpen: true };
    }

    var isOpen = state.isOpen;

    switch (action.type) {
        case "show_hidden_menu":
            return { isOpen: !isOpen };
        default:
            return state;
    }
}

export default navbar;