import axios from "axios";

const token = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const starGist = async (gistId: string) => {
  try {
    await apiClient.put(`/gists/${gistId}/star`);
  } catch (error) {
    console.error(error);
  }
};

export const unstarGist = async (gistId: string) => {
  try {
    await apiClient.delete(`/gists/${gistId}/star`);
  } catch (error) {
    console.error(error);
  }
};

export const checkGistStarred = async (gistId: string) => {
  try {
    const response = await apiClient.get(`/gists/${gistId}/star`);
    return response.status === 204;
  } catch (error) {
    return false;
  }
};
