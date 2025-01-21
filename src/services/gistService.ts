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

export const getGistDetails = async (gistId: string) => {
  try {
    const response = await apiClient.get(`/gists/${gistId}`);
    console.log("GIST DEETS", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forkGist = async (gistId: string) => {
  try {
    const response = await apiClient.post(`/gists/${gistId}/forks`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGistForksCount = async (gistId: string) => {
  try {
    let forksCount = 0;
    let page = 1;
    let response;

    do {
      response = await apiClient.get(`/gists/${gistId}/forks`, {
        params: { page, per_page: 100 },
      });
      forksCount += response.data.length;
      page++;
    } while (response.data.length === 100);

    return forksCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
