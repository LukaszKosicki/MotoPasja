export default class Text {
    static IsNullOrEmpty(text) {
        var reg = /^(?!.*[\s])(?=.*[a-zA-Z0-9])/;
        return reg.test(text);
    }

    static CheckPassword(pasword) {
        var reg = /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\\\|])(?=.{8,})/;
        return reg.test(pasword);
    }
}
