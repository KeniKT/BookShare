import axios, { type AxiosResponse } from "axios";

// Create an instance of axios with some default configuration
const apiClient = axios.create({
  baseURL: "https://bookshare-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  delete: apiClient.delete,
};

// Define a generic API function
export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown
): Promise<T> => {
  console.log("apiRequest:", { method, url, data }); // ✅ Check what method you're sending
  let response: AxiosResponse<T> = await apiClient.request({
    method,
    url,
    data,
  });
  if (method === "POST") {
    response = await apiClient.post(url, data);
  }

  return response.data;
};
