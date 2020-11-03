export default (password) => {
    const specialCharacters = "!@#$%^&*?_";
    const digits = "0-9";
    const letters = "a-zA-Z";
    const allowedCharacters = new RegExp(`[${specialCharacters}]`);
    const restrictedCharacters = new RegExp(`[^${specialCharacters}${digits}${letters}]`);
    const numericCharacters = new RegExp(`[${digits}]`);
    const alphabets = new RegExp(`[${letters}]`);

    if (password == null || password.length === 0) {
        throw new Error("Password should not be empty");        
    }

    if (password.length < 8) {
        throw new Error("Password should contain at least 8 characters");
    }

    if (!allowedCharacters.test(password)) {
        throw new Error("Password should contain at least one special character");
    }

    if (!numericCharacters.test(password)) {
        throw new Error("Password should contain at least one numeric character");
    }

    if (!alphabets.test(password)) {
        throw new Error("Password should contain at least one alphabet");
    }

    if (restrictedCharacters.test(password)) {
        throw new Error(`Only following special characters are allowed in the password: ${specialCharacters}`);
    }
};