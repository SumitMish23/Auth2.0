function Utility() {
    this.getIDOfTheInputElement = function (id) {
        return document.getElementById(id);
    };
    this.setAttributes = function () { };
    this.setAccessToken = function (access_token) {
        sessionStorage.setItem("access_token", access_token);
    };
    this.getAccessToken = function () {
        if (sessionStorage.getItem("access_token")) {
            return sessionStorage.getItem("access_token");
        }
        else {
            return false;
        }
    };
    this.fetchAPI = function (url, params) {
        let headers = Object.assign(Object.assign({}, params.headers), { Authorization: `Bearer ${this.getAccessToken()}` });
        try {
            return fetch(url, Object.assign(Object.assign({}, params), { headers: headers }));
        }
        catch (e) {
            console.log("Error fetching the API :", e);
        }
    };
}
const utility = new Utility();
export default utility;
