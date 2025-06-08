import axios from "axios";

const baseURL = "https://localhost:3000";
const userInfoURL = `${baseURL}/auth/user-info`;

export async function getUserInfo() : Promise<String>{

    try {
        const response = await axios.get(userInfoURL, {
          withCredentials: true, // important to include cookies if running in a browser environment
        });
    
        const username = response.data?.username;
        if (!username) {
          throw new Error('Username not found in response');
        }
    
        return username;
      } catch (error: any) {
        console.error('Error fetching Moodle username:', error.message);
        throw error;
      }
    return "-1";
}