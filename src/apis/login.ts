export interface LoginApi {
    accessToken: string;
}

export interface postLoginReq {
    email: string;
    password: string;
}

export interface PostLoginRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: LoginApi;
}