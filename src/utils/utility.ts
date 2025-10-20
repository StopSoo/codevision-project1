export const isValidId = (id: string) => {
    return (
        id.match('^(?=.*[a-z0-9])[a-z0-9]{4,16}$') !== null
    );
}

export const isValidPassword = (pw: string) => {
    return (
        pw.match('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,16}$') !== null
    );
}