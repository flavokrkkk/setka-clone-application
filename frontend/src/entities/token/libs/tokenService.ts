import Cookies from "js-cookie";
class TokenService {
  public deleteAccessToken() {
    Cookies.remove("session");
  }

  public getAccessToken() {
    return Cookies.get("session");
  }
  public setAccessToken(value: string) {
    return Cookies.set("session", value);
  }
}

export default new TokenService();
