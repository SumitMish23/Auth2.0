function Utility(this: any) {
  this.getIDOfTheInputElement = function (id: string) {
    return document.getElementById(id) as HTMLInputElement | HTMLFormElement;
  };
  this.setAttributes = function () { };
  this.setAccessToken = function (access_token: string) {
    sessionStorage.setItem("access_token", access_token);
  };
  this.getAccessToken = function () {
    if (sessionStorage.getItem("access_token")) {
      return sessionStorage.getItem("access_token");
    } else {
      return false;
    }
  };
  this.fetchAPI = function (url: string, params: any) {
    let headers = {
      ...params.headers,
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
    try {
      return fetch(url, {
        ...params,
        headers: headers,
      });
    } catch (e) {
      console.log("Error fetching the API :", e);
    }
  };
}
const utility = new Utility();
export default utility;
