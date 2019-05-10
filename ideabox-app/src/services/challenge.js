import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const challengeIdeas = (challengeId) => {
    return service.get(`/challenges/${challengeId}`)
}

export {challengeIdeas}

