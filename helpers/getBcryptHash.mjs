import bcrypt from 'bcryptjs';

export default async (input, salt) => {
    if (input == null || input.length === 0) {
        throw new Error("Input should not be empty");
    }

    if (Buffer.byteLength(input) > 72) {
        throw new Error("Input should contain less than 72 characters");
    }

    if (salt == null) {
        throw new Error("Salt value should not be empty");
    }

    if (salt <= 0 || salt > 15) {
        throw new Error("Salt value should be greater than 0 and less than or equal to 15");
    }

    return await bcrypt.hash(input, salt);
};