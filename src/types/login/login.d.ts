export interface LoginSuccessRes {
    data: {
        username: string;
        accessToken: string;
    }
}

export interface LoginReq {
    email: string;
    password: string;
    role: string;
}

export type LoginRes = LoginSuccessRes;