import { CheckEmailReq, SignupReq } from "@/types/signup/signup";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";
import { useSignupInvalidEmailStore } from "@/store/store";

export const postSignupInfo = async ({
    username, email, password, phoneNumber, workplace, role, address
}: SignupReq) => {
    try {
        const response = await AuthAPI.signup({
            username, email, password, phoneNumber, workplace, role, address
        });

        if ("data" in response) {
            console.log('signup 성공');
            return response;
        } else {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
            useSignupInvalidEmailStore.setState({ isModalOpen: true });
        } else {
            console.error("회원가입 실패:", err.message);
        }
    }
}

export const getCheckEmail = async ({
    email, role
}: CheckEmailReq) => {
    try {
        const response = await AuthAPI.checkEmailExist({
            email, role
        });

        if ("data" in response) {
            console.log("email 중복 검사 조회 성공");
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getCheckEmail error", err);
    }
}