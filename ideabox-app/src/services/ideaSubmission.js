import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

const submitIdea = (
  title,
  challenge,
  category,
  description,
  files,
  need,
  benefit,
  estimatedResources,
  competition,
  teamMembers,
  message,
  privacy
) => {
  return service
    .post("/submit-idea", {
      title,
      challenge,
      category,
      description,
      files,
      need,
      benefit,
      estimatedResources,
      competition,
      teamMembers,
      message,
      privacy
    })
    .then(response => response.data);
};

const getUsers = () => {
  return service.get("/get-users").then(response => response.data);
};

const fileUpload = data => {
  return service
    .post("/file-upload", data)
    .then(response => response.data.secure_url);
};

const editIdea = (ideaId, values) => {
  return service
    .post(`/edit-idea/${ideaId}`, { values })
    .then(response => response.data);
};

export { submitIdea, getUsers, fileUpload, editIdea };
