import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  withCredentials: true
});

const signup = (firstName, lastName, username, password, email, role) => {
  return service
    .post("/signup", { firstName, lastName, username, password, email, role })
    .then(response => response.data);
};

const login = (username, password) => {
  return service
    .post("/login", { username, password })
    .then(response => response.data);
};

const logout = () => {
  return service.post("/logout").then(response => response.data);
};

const loggedin = () => {
  return service.get("/loggedin").then(response => response.data);
};

export { signup, login, logout, loggedin };
