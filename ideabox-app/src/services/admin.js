import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
});

const getAllUsers = () => {
    return service.get("/all-users")
}

const updateRoleToManager = userId => {
    return service.put(`/update-role-to-manager/${userId}`)
}

const updateRoleToEmployee = userId => {
    return service.put(`/update-role-to-employee/${userId}`)
}

export { getAllUsers, updateRoleToManager, updateRoleToEmployee }