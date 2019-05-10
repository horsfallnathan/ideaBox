import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

const challengeIdeas = (challengeId) => {
    return service.get(`/challenges/${challengeId}`)
}

// const currentChallenge = () => {

// }


const createChallenge = (title, description, deadline) => {
    return service
    .post('/managerDashboard/challengeForm', {title, description, deadline})
    .then(response => response.data)
}

export {challengeIdeas, createChallenge}

