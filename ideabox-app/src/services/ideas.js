import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const publicViewIdea = (ideaId) => {
    return service.get(`/idea/${ideaId}`)
}

const myIdeas = () => {
    return service.get("/my-ideas")
}

const deleteIdea = (ideaId) => {
    return service.delete(`/my-ideas/${ideaId}`)
}

export { publicViewIdea, myIdeas, deleteIdea }