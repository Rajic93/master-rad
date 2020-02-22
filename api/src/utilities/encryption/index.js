
const encrypt = (data, salt) => data + salt;

const decrypt = data => data;

module.exports = {
    encrypt,
    decrypt,
};
