class Renderer {
    constructor(app) {
        this.app = app;
    }

    renderUI() {
        console.log("renderer renderUI");
        this.renderCurrency();
        this.renderBalance();
        this.renderAddress();
    }

    renderCurrency() {
        console.log("renderer renderCurrency");
        let currency = this.app.getCurrency();
        let elements = document.getElementsByClassName("currency_symbol");
        // for loop
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            element.innerHTML = currency;
        }
    }

    renderBalance() {
        let balance = this.app.getBalance();
        let element = document.getElementById("balance");
        element.innerHTML = balance;
    }

    renderAddress() {
        let address = this.app.getAddress();
        let element = document.getElementById("current-address");
        element.innerHTML = address;
    }
}

module.exports = Renderer;
