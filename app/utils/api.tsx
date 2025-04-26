import axios from "axios";
import { UserResponse } from '../types/user';

export const getUsers = async (page: number = 1): Promise<UserResponse> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_X_API_KEY || '';
    const response = await axios.get(`${apiUrl}/users`, {
      params: { page },
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}