import cryptoJs from 'crypto-js';

export function encrypt(pwd: string) {
    return cryptoJs.AES.encrypt(pwd, process.env.CRYPTO_SECRET_KEY!).toString()
}

export function decrypt(pwd: string) {

    const bytes = cryptoJs.AES.decrypt(pwd, process.env.CRYPTO_SECRET_KEY!);

    return bytes.toString(cryptoJs.enc.Utf8);
}