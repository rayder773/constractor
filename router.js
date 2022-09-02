class Router {
  _routes;
  _isOk = true;

  constructor({ routes = null }) {
    this.app = document.getElementById("app");
    this.routes = routes;
  }

  set routes(_routes) {
    this._routes = _routes;
    this.onHashChange();
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  set page(_newPage) {
    if (this._page) {
      this._page.remove();
    }
    this.app.append(_newPage);

    this._page = _newPage;
  }

  set permissions(_permissions) {
    this._permissions = _permissions;
    this._isOk = this.checkPermissions();
  }

  checkPermissions() {
    if (!this._permissions) return true;

    if (!Array.isArray(this._permissions)) {
      this._permissions = [this._permissions];
    }

    for (let i = 0; i < this._permissions.length; i++) {
      let { check, fallback } = this._permissions[i];

      if (!check || !check.length) return true;

      if (!Array.isArray(check)) {
        check = [check];
      }

      this._isOk = check.every((el) => el());

      if (!this._isOk) {
        if (fallback) {
          this.redirect(fallback);
          return false;
        }
      }
    }
  }

  onHashChange(e) {
    const hash = (window.location.hash || "/").replace("#", "");

    const { page, permissions, redirect, beforeMount, afterMount } =
      this._routes[hash];

    this.permissions = permissions;

    if (!this._isOk) return;

    if (redirect) {
      return this.redirect(redirect);
    }

    if (!page || !(page instanceof HTMLElement)) return;

    if (beforeMount) {
      beforeMount();
    }

    this.page = page;

    if (beforeMount) {
      afterMount();
    }
  }

  redirect(hash) {
    if (!hash.includes("#")) {
      hash = `#${hash}`;
    }
    window.location.hash = hash;
  }
}

export { Router };
