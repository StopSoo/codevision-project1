import { LoginReq, LoginRes } from "@/types/login/login";
import { SignupReq, SignupRes } from "@/types/signup/signup";
import { AxiosInstance } from "axios";

const auth = (axiosInstance: AxiosInstance) => ({
    signup: async (data: SignupReq): Promise<SignupRes> => {
        const response = await axiosInstance.post<SignupRes>('/auth/signup', data);
        return response.data;
    },

    login: async (data: LoginReq): Promise<LoginRes> => {
        const response = await axiosInstance.post<LoginRes>('/auth/login', data);
        if (response.data.result.accessToken) {
            localStorage.setItem('accessToken', response.data.result.accessToken);
        }
        return response.data;
    },
    // 추후 로그아웃 API가 구현되면 적용 예정
    // logout: async (): Promise<void> => {
    //     localStorage.removeItem('accessToken');
    //     await axiosInstance.post('/auth/logout');
    // }
});

export default auth;