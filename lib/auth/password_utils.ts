import crypto from "crypto";

export function generatePassword(password: string) {
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");

    return {
        salt: salt,
        hashstring: genHash,
    };
}

export function isValidPassword(
    password: string,
    hashstring: string,
    salt: string,
) {
    let hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hashstring === hashVerify;
}
