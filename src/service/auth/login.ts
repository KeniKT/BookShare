import { apiRequest } from "../apiClient";

// Define the structure of the data to be sent in a POST request
interface LoginRequest {
  email: string;
  password: string;
}

// Define the response structure from the server when a user is created
interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
}

// Function to create a new user
export const login = async (userData: LoginRequest): Promise<LoginResponse> => {
  return await apiRequest<LoginResponse>('/user/login', 'POST', userData);
};