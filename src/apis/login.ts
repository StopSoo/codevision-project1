import { LoginReq } from "@/types/login/login";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";
import { useLoginFailModalStore, useNotExistEmailModalStore, useWithdrawalModalStore, useWrongPwModalStore } from "@/store/store";
// 로그인
export const postLoginInfo = async ({ email, password, role }: LoginReq) => {
    try {
        const response = await AuthAPI.login({
            email,
            password,
            role,
        });

        if ("data" in response) {
            return response;
        } else {
            return null;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
            console.error("존재하지 않는 이메일입니다.");
            useNotExistEmailModalStore.setState({ isModalOpen: true });
        } else if (err.response?.status === 401) {
            console.error("비밀번호가 일치하지 않습니다.");
            useWrongPwModalStore.setState({ isModalOpen: true });
        } else if (err.response?.status === 404) {
            console.error("탈퇴한 사용자입니다.");
            useWithdrawalModalStore.setState({ isModalOpen: true });
        } else {
            console.error("로그인 실패:", err.message);
            useLoginFailModalStore.setState({ isModalOpen: true });
        }
        return null;
    }
}