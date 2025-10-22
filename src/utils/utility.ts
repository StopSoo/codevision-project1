export const isValidEmail = (email: string) => {
    return (
        email.match('^[a-z0-9+-\_.]*@[a-z0-9-]+\.[a-z0-9-.]+$') !== null
    );
}

export const isValidPassword = (pw: string) => {
    return (
        pw.match('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,16}$') !== null
    );
}