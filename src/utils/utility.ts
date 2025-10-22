export const isValidEmail = (email: string) => {
    return (
        email.match('/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i') !== null
    );
}

export const isValidPassword = (pw: string) => {
    return (
        pw.match('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,16}$') !== null
    );
}