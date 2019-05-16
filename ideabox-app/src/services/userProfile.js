import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

const getUser = () => {
  return service.get("/user-profile");
};

const editUser = (values) => {
  return service
    .put("/user-profile", values)
}

export { getUser, editUser }