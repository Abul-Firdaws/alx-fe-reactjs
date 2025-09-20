import axios from "axios";

const BASE_URL = "https://api.github.com";

export const githubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});