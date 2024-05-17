function Utility(this: any) {
  this.getIDOfTheInputElement = function (id: string) {
    return document.getElementById(id) as HTMLInputElement | HTMLFormElement;
  };
  this.setAttributes = function () { };
  this.setAccessToken = function (access_token: string) {
    sessionStorage.setItem("access_token", access_token);
  };
  this.setRefreshToken = function (refresh_token: string) {
    sessionStorage.setItem("refresh_token", refresh_token);
  };
  this.getAccessToken = function () {
    if (sessionStorage.getItem("access_token")) {
      return sessionStorage.getItem("access_token");
    } else {
      return false;
    }
  };
  this.getRefreshToken = function () {
    if (sessionStorage.getItem("refresh_token")) {
      return sessionStorage.getItem("refresh_token");
    } else {
      return false;
    }
  };
  this.checkForExpiredToken = async function () {
    if (!this.getRefreshToken()) return;
    const response = await fetch('http://localhost:3000/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ 'refresh_token': this.getRefreshToken() }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { accessToken } =await response.json();
    if (!accessToken) return
    return accessToken;
  };
  this.fetchAPI = async function (url: string, params: any) {
    let headers = {...params.headers,Authorization: `Bearer ${this.getAccessToken()}`};
    try {
     const responseFromApi = await fetch(url, {
        ...params,
        headers: headers,
      });
      const response = await responseFromApi.json();
      // IF TOKEN IS EXPIRED OR INCORRECT .
      if (response.status === 400) {
        const newAccessToken =await this.checkForExpiredToken();
        this.setAccessToken(newAccessToken);
        headers = {...params.headers,Authorization: `Bearer ${this.getAccessToken()}`};
        return await fetch(url, {
          ...params,
          headers: headers,
        });
      } else {
        return responseFromApi;
      }
    } catch (e) {
      console.log("Error fetching the API :", e);
    }
  };
}
const utility = new Utility();
export default utility;
