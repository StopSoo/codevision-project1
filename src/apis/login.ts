import { LoginReq } from "@/types/login/login";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";
import { useLoginFailModalStore, useNotExistEmailModalStore, useWithdrawalUserModalStore, useWrongPwModalStore } from "@/store/store";
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
            useNotExistEmailModalStore.setState({ isModalOpen: true });
        } else if (err.response?.status === 401) {
            useWrongPwModalStore.setState({ isModalOpen: true });
        } else if (err.response?.status === 404) {
            useWithdrawalUserModalStore.setState({ isModalOpen: true });
        } else {
            useLoginFailModalStore.setState({ isModalOpen: true });
        }
        return null;
    }
}