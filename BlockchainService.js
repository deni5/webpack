var default_balance = 0.365756788;
var default_address = "0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb";

var web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/3be763d989e54a0e93b760a484fa2aa1"));

class BlockchainService {
    constructor(app) {
        this.app = app;
    }

    getBalance() {
        return default_balance;
    }

    getAddress() {
        return default_address;
    }

    // Відправка транзакції
    sendCurrency() {
        let _address = document.getElementById("transfer_address").value;
        console.log(_address);
        let _amount = document.getElementById("transfer_amount").value;
        let currency = this.app.getCurrency();
        console.log(currency);
        let result = "Sending " + _amount + " " + currency + " to " + _address;
        alert(result);
    }

    // Отримання даних від Metamask
    getMetamaskData() {
        if (typeof window.ethereum !== 'undefined') {
            return window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(function (accounts) {
                    var currentAddress = accounts[0];
                    return window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [currentAddress, 'latest']
                    }).then(function (balance) {
                        var balanceInEth = web3.utils.fromWei(balance, "ether");
                        return { address: currentAddress, balance: balanceInEth };
                    });
                });
        } else {
            return Promise.reject("Metamask is not found");
        }
    }

    // Отримання балансу з мережі Sepolia
    getSepoliaBalance() {
        const accountAddress = this.app.getAddress();
        return web3.eth.getBalance(accountAddress)
            .then(function (balance) {
                const balanceInEth = web3.utils.fromWei(balance, "ether");
                return balanceInEth;
            });
    }
}

// Отримання балансу з мережі Sepolia за адресою
var address = "0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb";
web3.eth.getBalance(address)
    .then(function (balance) {
        var balanceString = web3.utils.fromWei(balance, "ether");
        console.log("Balance " + address + " in Sepolia network:", balanceString + " ETH");
    })
    .catch(function (error) {
        console.error("balance error:", error);
    });



module.exports = BlockchainService;




