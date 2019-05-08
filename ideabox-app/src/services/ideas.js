import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const publicViewIdea = (ideaId) => {
    return service.get(`/idea/${ideaId}`)
}

export { publicViewIdea }