import jwtDecode from "jwt-decode";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default {
  login: ({ username, password }) => {
    const url = `${process.env.REACT_APP_API_ENTRYPOINT || "http://mbp.audioware.nl/api" }/authentication_token`;
    console.log("url", url)
    const request = new Request( url,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token, data, refresh_token }) => {
        if (!data.roles.includes("ROLE_ADMIN")) {
          throw new Error("User is not an admin");
        }
        cookies.set("BEARER", token)
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("userdata", JSON.stringify(data));
        console.log("userdata", data)        
      });
  },
  logout: () => {
    console.log("logout")
    cookies.remove("BEARER")
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userdata");
    window.location.href = 'http://mbp.audioware.nl';
    return Promise.resolve();
  },
  checkAuth: () => {
    console.log("checkAuth")
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (!userdata || !userdata.roles.includes("ROLE_ADMIN")) return Promise.reject()

    try {
      if (
        !localStorage.getItem("token") ||
        new Date().getTime() / 1000 >
          jwtDecode(localStorage.getItem("token"))?.exp
      ) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    } catch (e) {
      // override possible jwtDecode error
      return Promise.reject();
    }
  },
  checkError: (err) => {
    if ([401, 403].includes(err?.status || err?.response?.status)) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const localStorageData = JSON.parse(localStorage.getItem("userdata"))
    console.log("localStorageData", localStorageData)
    const userdata = {
      id: localStorageData.username,
      fullName: localStorageData.fullname,
      avatar: localStorageData.profilepicURL
    }
    return Promise.resolve(userdata)}
};