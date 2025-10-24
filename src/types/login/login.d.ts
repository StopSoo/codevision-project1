export interface LoginSuccessRes {
    data: {
        username: string;
        accessToken: string;
    }
}

// interface LoginFailRes {
//     code: string;
//     message: string;
// }

export interface LoginReq {
    email: string;
    password: string;
    role: string;
}

export type LoginRes = LoginSuccessRes;