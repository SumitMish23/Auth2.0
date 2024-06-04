var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Utility() {
    this.getIDOfTheInputElement = function (id) {
        return document.getElementById(id);
    };
    this.setAttributes = function () { };
    this.setAccessToken = function (access_token) {
        sessionStorage.setItem("access_token", access_token);
    };
    this.setRefreshToken = function (refresh_token) {
        sessionStorage.setItem("refresh_token", refresh_token);
    };
    this.getAccessToken = function () {
        if (sessionStorage.getItem("access_token")) {
            return sessionStorage.getItem("access_token");
        }
        else {
            return false;
        }
    };
    this.getRefreshToken = function () {
        if (sessionStorage.getItem("refresh_token")) {
            return sessionStorage.getItem("refresh_token");
        }
        else {
            return false;
        }
    };
    this.checkForExpiredToken = function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getRefreshToken())
                return;
            const response = yield fetch('http://localhost:3000/refresh-token', {
                method: 'POST',
                body: JSON.stringify({ 'refresh_token': this.getRefreshToken() }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const { accessToken } = yield response.json();
            if (!accessToken)
                return false;
            return accessToken;
        });
    };
    this.fetchAPI = function (url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = Object.assign(Object.assign({}, params.headers), { Authorization: `Bearer ${this.getAccessToken()}` });
            try {
                const responseFromApi = yield fetch(url, Object.assign(Object.assign({}, params), { headers: headers }));
                const response = yield responseFromApi.json();
                /* IF TOKEN IS EXPIRED OR INCORRECT */
                if (response.status === 400) {
                    const newAccessToken = yield this.checkForExpiredToken();
                    this.setAccessToken(newAccessToken);
                    headers = Object.assign(Object.assign({}, params.headers), { Authorization: `Bearer ${this.getAccessToken()}` });
                    const apiResponse = yield fetch(url, Object.assign(Object.assign({}, params), { headers: headers }));
                    return yield apiResponse.json();
                }
                else {
                    return response;
                }
            }
            catch (e) {
                console.log("Error fetching the API :", e);
            }
        });
    };
}
const utility = new Utility();
export default utility;
