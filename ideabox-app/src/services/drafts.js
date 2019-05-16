import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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

const deleteDraft = draftId => {
  return service.delete(`/my-drafts/${draftId}`);
};

export { createDraft, getDraft, drafts, updateDraft, deleteDraft };
