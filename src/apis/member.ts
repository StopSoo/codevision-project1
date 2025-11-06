import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
import { UpdatePasswordReq, UpdateProfileReq } from "@/types/member/member";
import { useWrongPwModalStore } from "@/store/store";
// 마이페이지
export const getMyPage = async () => {
    try {
        const response = await AuthAPI.viewMyPage();

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getMyPage error", err);
        return null;
    }
};
// 내 정보 수정
export const patchMyProfile = async (data: UpdateProfileReq) => {
    try {
        const response = await AuthAPI.updateProfile(data);
        // 빈 객체일 경우
        if (Object.keys(response).length === 0) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("patchMyProfile error", err);
        return null;
    }
};
// 비밀번호 변경
export const patchMyPassword = async (data: UpdatePasswordReq) => {
    try {
        const response = await AuthAPI.updatePassword(data);
        // 빈 객체일 경우
        if (Object.keys(response).length === 0) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            useWrongPwModalStore.setState({ isModalOpen: true });
        }
        return null;
    }
};
// 계정 탈퇴
export const postWithdrawMember = async (password: string) => {
    try {
        const response = await AuthAPI.withdrawMember(password);
        // 빈 객체일 경우
        if (Object.keys(response).length === 0) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("postWithdrawMember error", err);
        return null;
    }
};