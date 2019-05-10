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

const createDraft = values => {
  return service.post(`/create-draft`, values);
};

const updateDraft = (draftId, values) => {
  return service.post(`update-draft/:draftId`, values);
};

export { createDraft, getDraft, drafts, updateDraft };
