export default (username) => {    
    const restrictedCharacters = new RegExp("[^_a-zA-Z0-9]");
    const alphabets = new RegExp("[a-zA-Z]");

    if (username == null || username.length === 0) {
        throw new Error("Username should not be empty");        
    }

    if (username.length < 6) {
        throw new Error("Username should contain at least 8 characters");
    }

    if (restrictedCharacters.test(username)) {
        throw new Error("Username should only contain _ as a special character");
    }
    
    if (!alphabets.test(username)) {
        throw new Error("Username should contain at least one alphabet");
    }
};