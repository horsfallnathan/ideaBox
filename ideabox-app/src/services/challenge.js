import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const challengeIdeas = (challengeId) => {
    return service.get(`/challenges/${challengeId}`)
}

const currentChallenge = () => {
    return service.get("/current-challenge")
}

const getAllChallenges = () => {
    return service.get("/all-challenges")
}

const createChallenge = (title, description, startDate, deadline) => {
    return service
        .post('/managerDashboard/challengeForm', { title, description, startDate, deadline })
        .then(response => response.data)
}

export { challengeIdeas, createChallenge, currentChallenge, getAllChallenges }

