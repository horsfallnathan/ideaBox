import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

const submitIdea = (
  title,
  category,
  description,
  files,
  need,
  benefit,
  competition,
  estimatedResources,
  ideaPrivacy,
  teamMembers
) => {
  return service
    .post("/submit-idea", {
      title,
      category,
      description,
      files,
      need,
      benefit,
      competition,
      estimatedResources,
      ideaPrivacy,
      teamMembers
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

export { submitIdea, getUsers, fileUpload };
