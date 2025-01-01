import Cookies from "js-cookie";
class TokenService {
  public deleteAccessToken() {
    Cookies.remove("access_token");
  }

  public getAccessToken() {
    return Cookies.get("access_token");
  }
  public setAccessToken(value: string) {
    return Cookies.set("access_token", value);
  }
}

export default new TokenService();
