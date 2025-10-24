export const isValidEmail = (email: string) => {
    return (
        email.match(/^[a-z0-9._+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i) !== null
    );
}

export const isValidPassword = (pw: string) => {
    return (
        pw.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&]).{8,}$/) !== null
    );
}