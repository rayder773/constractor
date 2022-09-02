class App {
  _router = null;
  _models = {};
  _networdLayer = {};

  constructor({ models = null, networdLayer = null, router = null } = {}) {
    this.models = models;
    this.networdLayer = networdLayer;
    this.router = router;
  }

  set models(_models) {
    this._models = _models;
  }

  set networdLayer(networdLayer) {
    this._networdLayer = networdLayer;
  }

  set router(router) {
    this._router = router;
  }
}

export { App };
