import { SignupReq } from "@/types/signup/signup";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";

export const postSignupInfo = async ({ username, email, password, phoneNumber, workplace, role, address }: SignupReq) => {
    try {
        const response = await AuthAPI.signup({
            username, email, password, phoneNumber, workplace, role, address
        });

        if (response) {
            console.log('signup 성공');
            console.log(response.data.username, response.data.role);
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            console.error("401 Error");
        } else if (err.response?.status === 404) {
            console.error("404 Error");
        } else if (err.response?.status === 409) {
            console.log(err.response.data);
        } else {
            console.error("회원가입 실패:", err.message);
        }
    }
}