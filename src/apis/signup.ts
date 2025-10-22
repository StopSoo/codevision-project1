import { SignupReq } from "@/types/signup/signup";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";

export const postSignupInfo = async ({ userName, email, password, phoneNumber, workplace, role, address }: SignupReq) => {
    try {
        const response = await AuthAPI.signup({
            userName, email, password, phoneNumber, workplace, role, address
        });

        const { isSuccess, result } = response;

        if (isSuccess) {
            return result;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            // console.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (err.response?.status === 404) {
            // console.error("존재하지 않는 계정입니다.");
        } else {
            // console.error("로그인 실패:", err.message);
        }
    }
}