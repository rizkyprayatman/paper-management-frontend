import Api from "../utils/Api";

class AuthServices {
  static async login(data) {
    const response = await Api.post("/login", data);
    // console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(data.email));
    return response;
  }

  static async register(data) {
    const response = await Api.post("/register", data);
    // console.log(response);
    return response;
  }
}

export default AuthServices;
