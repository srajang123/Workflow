class Auth {
    constructor() {
        this.authenticated = false;
        this.activeId = "";
        this.roll = "";
    }

    login(cb,roll,activeId) {
        this.authenticated = true;
        this.roll = roll;
        this.activeId = activeId
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        this.roll = "";
        this.activeId = "";
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();