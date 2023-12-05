
// відповідає за реагування на кліки користувача
class ListenerManager {
    constructor(app) {
        this.app = app;
    }

    setListeners() {
        this.setChangeCurrencyListener();
        this.setSendCurrencyListener();
        this.setMetamaskListener();
    }

    setChangeCurrencyListener() {
        let elements = document.getElementsByClassName("currency_container");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            element.addEventListener("click", (event) => {
                let element = event.target.parentNode;
                let currency = element.getAttribute("data-value");
                this.app.changeCurrency(currency);
            });
        }
    }

    setSendCurrencyListener() {
        document.getElementById("send_button").addEventListener("click", (event) => {
            this.app.sendCurrency();
        });
    }

    setMetamaskListener() {
        // код для виклику Metamask
        // виклик getMetamaskData і відображення адреси та балансу у DOM
        document.getElementById("metamask_button").addEventListener("click", () => {
            this.app.getMetamaskData()
                .then((metamaskData) => {
                    // Отримані дані від Metamask
                    console.log("Address from Metamask:", metamaskData.address);
                    console.log("Balance from Metamask:", metamaskData.balance);

                    // адреса та баланс у DOM або використовувати їх іншим чином
                })
                .catch((error) => {
                    console.error("Error getting data from Metamask:", error);
                });
        });
    }
}

module.exports = ListenerManager;


