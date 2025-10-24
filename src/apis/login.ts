import { LoginReq } from "@/types/login/login";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";

export const postLoginInfo = async ({ email, password, role }: LoginReq) => {
    try {
        const response = await AuthAPI.login({
            email,
            password,
            role,
        });
        console.log(response);
        if ("data" in response) {
            console.log('login 성공');
            return response;
        } else {
            console.log('login 실패');
            return null;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
            console.error("존재하지 않는 이메일입니다.");
        } else if (err.response?.status === 401) {
            console.error("비밀번호가 일치하지 않습니다.");
        } else if (err.response?.status === 404) {
            console.error("탈퇴한 사용자입니다.");
        } else {
            console.error("로그인 실패:", err.message);
        }
        return null;
    }
}