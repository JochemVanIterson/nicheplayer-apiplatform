import jwtDecode from "jwt-decode";

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
      .then(({ token, data }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userdata", JSON.stringify(data));
        console.log("userdata", data)
      });
  },
  logout: () => {
    console.log("logout")
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    console.log("checkAuth")
    try {
      if (
        !localStorage.getItem("token") ||
        new Date().getTime() / 1000 >
          jwtDecode(localStorage.getItem("token"))?.exp
      ) {
        return Promise.reject();
      }
      return Promise.resolve();
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