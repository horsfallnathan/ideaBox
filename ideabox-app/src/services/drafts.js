import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

const getDraft = draftId => {
  return service.get(`/draft/${draftId}`);
};

const drafts = () => {
  return service.get("/drafts");
};

const createDraft = () => {
  return service.post(`/create-draft`);
};

const updateDraft = draftId => {
  return service.post(`update-draft/:draftId`);
};

export { createDraft, getDraft, drafts, updateDraft };
