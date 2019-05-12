import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

const challengeIdeas = challengeId => {
  return service.get(`/challenges/${challengeId}`);
};

const currentChallenge = () => {
  return service.get("/currentChallenge");
};

const createChallenge = (title, description, startDate, deadline) => {
  return service
    .post("/managerDashboard/challengeForm", {
      title,
      description,
      startDate,
      deadline
    })
    .then(response => response.data);
};

const setDeadline = value => {
  console.log(value);
  return service.post("/set-deadline", { value }).then(response => {
    console.log(response.data);
  });
};

export { challengeIdeas, createChallenge, currentChallenge, setDeadline };
