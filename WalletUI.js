class WalletUI {
    constructor(app, listenerManager, renderer) {
        this.app = app;
        this.listenerManager = listenerManager;
        this.renderer = renderer;
    }

    prepareUI() {
        console.log("walletUi prepareUi");
        this.getRenderer().renderUI();
        this.getListenerManager().setListeners();
    }

    getListenerManager() {
        return this.listenerManager;
    }

    getRenderer() {
        return this.renderer;
    }

    renderUI() {
        console.log("walletUi renderUI");
        this.getRenderer().renderUI();
        this.getListenerManager().setListeners();
    }
}
module.exports = WalletUI;
