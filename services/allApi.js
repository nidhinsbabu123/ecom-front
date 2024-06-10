import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// Add a user from register page -- Sign-Up

export const addUser = async (body, header) => {
    return await commonApi("POST", `${BASE_URL}/api/register`, body, header)
}

// Login only by valid users -- Login
export const loginuser = async (body, header) => {
    return await commonApi("POST", `${BASE_URL}/api/login`, body, header)
}

// Get details of valid user -- current_user
export const current_user = async () => {
    return await commonApi("GET", `${BASE_URL}/api/user-details`)
}

