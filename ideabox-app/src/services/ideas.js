import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const getSingleIdea = (ideaId) => {
    return service.get(`/${ideaId}`)
}

const myIdeas = () => {
    return service.get("/my-ideas")
}

const deleteIdea = (ideaId) => {
    return service.delete(`/my-ideas/${ideaId}`)
}

export { getSingleIdea, myIdeas, deleteIdea }