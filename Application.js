const DEFAULT_CURRENCY = "ETH";

const Renderer = require("./ui/Renderer");
console.log (Renderer);

const ListenerManager = require("./ui/ListenerManager");
const WalletUI = require("./ui/WalletUI");
const BlockchainService = require("./blockchain/BlockchainService");
const Converter = require("./converter/Converter");

class Application {
    constructor() {
        console.log("Application is being constructed");
        this.currency = DEFAULT_CURRENCY;
        let renderer = new Renderer(this);
        let listenerManager = new ListenerManager(this);
        let walletUi = new WalletUI(this, listenerManager, renderer);
        let blockchainService = new BlockchainService(this);
        this.blockchainService = blockchainService;
        console.log("Application is ready");
    }

    setWalletUI(walletUi) {
        this.walletUi = walletUi;
    }

    getWalletUi() {
        return this.walletUi;
    }

    prepareUI() {
        console.log("app prepareUI");
        this.walletUi.prepareUI();
    }

    getCurrency() {
        return this.currency;
    }

    changeCurrency(currency) {
        this.setCurrency(currency);
        this.getWalletUi().renderUI();
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    getMetamaskData() {
        if (typeof window.ethereum !== 'undefined') {
            return window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    const currentAddress = accounts[0];
                    return window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [currentAddress, 'latest']
                    }).then((balance) => {
                        const balanceInEth = web3.utils.fromWei(balance, "ether");
                        return { address: currentAddress, balance: balanceInEth };
                    });
                });
        } else {
            return Promise.reject("MetaMask не виявлений");
        }
    }

    updateDataAndRender() {
        this.getMetamaskData()
            .then((data) => {
                console.log("MetaMask Data:", data);
                const addressDisplay = document.getElementById("current-address");
                const balanceDisplay = document.getElementById("balance");

                addressDisplay.textContent = data.address;
                balanceDisplay.textContent = data.balance + " ETH";

                if (this.walletUi) {
                    this.getWalletUi().renderUI();
                }
            })
            .catch((error) => {
                console.error("Помилка отримання даних від MetaMask:", error);
            });
    }
}


module.exports = Application
