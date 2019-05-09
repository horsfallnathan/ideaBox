import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const createComment = (commentInput) => {
    return service.post("/add-comment", { content: commentInput.content, ideaId: commentInput.ideaId })
}

export { createComment }