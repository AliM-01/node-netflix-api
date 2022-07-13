const cryptoJs = require('crypto-js');

encrypt = (pwd) => {
    return cryptoJs.AES.encrypt(pwd, process.env.CRYPTO_SECRET_KEY).toString()
}
decrypt = (pwd) => {
    const bytes = CryptoJS.AES.decrypt(pwd, process.env.CRYPTO_SECRET_KEY);
    
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}