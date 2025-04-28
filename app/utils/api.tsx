import axios from "axios";
import { User, UserResponse } from '../types/user';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Error desconocido";
}
export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
export const getUsers = async (page: number = 1): Promise<UserResponse> => {
  try {
    const response = await api.get(`/users`, {
      params: { page }  
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}