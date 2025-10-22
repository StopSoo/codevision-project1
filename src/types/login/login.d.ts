export interface LoginApi {
    accessToken: string;
}

export interface LoginReq {
    email: string;
    password: string;
    role: string;
}

export interface LoginRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: LoginApi;
}