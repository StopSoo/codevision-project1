import { CheckEmailReq, SignupReq } from "@/types/signup/signup";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";
import { useSignupInvalidEmailStore } from "@/store/store";
// 회원가입
export const postSignupInfo = async ({
    username, email, password, phoneNumber, workplace, role, address
}: SignupReq) => {
    try {
        const response = await AuthAPI.signup({
            username, email, password, phoneNumber, workplace, role, address
        });

        if ("data" in response) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
            useSignupInvalidEmailStore.setState({ isModalOpen: true });
        }
    }
}
// 이메일 중복 검사
export const getCheckEmail = async ({
    email, role
}: CheckEmailReq) => {
    try {
        const response = await AuthAPI.checkEmailExist({
            email, role
        });

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getCheckEmail error", err);
    }
}