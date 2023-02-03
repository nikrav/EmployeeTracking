import axios from "axios";

class AuthService {
  login(username, password) {
    return axios
      .post(process.env.REACT_APP_PROXY + "/sign-in", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();