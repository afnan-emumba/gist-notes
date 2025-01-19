import axios from "axios";

let token = localStorage.getItem("token");

export const gitHubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    "x-Github-Api-Version": "2022-11-28",
    Authorization: token ? `Bearer ${token}` : null,
  },
});
