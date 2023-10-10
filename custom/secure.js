import path from 'path';

import aes256 from 'aes256';

import bcrypt from 'bcryptjs';

const key = 'itskrgroupkey';

import jwt from 'jsonwebtoken';

const cipher = aes256.createCipher(key);

export const getEncryptId = (id) => {
    return encodeURIComponent(cipher.encrypt(id.toString()));
}

export const getDecryptId = (id) => {
    return cipher.decrypt(decodeURIComponent(id));
}

export const pageLimit = () => {
    return 10;
}

export const zeroPad = (num, places) => String(num).padStart(places, '0');

export const checkDataIsValid = (data) => {
    if(data !== null && data !== undefined && data !== ''){
        return true;
    }
    return false;
}

export const validatePassword = (pass, hashPass) => {
    return bcrypt.compareSync(pass, hashPass);
}

export const validateRefreshToken = (refreshToken) => {
    const accessToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userSerialize) => {
        if (err) return false;
        const newUserSerislize = userSerialize;
        if(newUserSerislize.iat) delete newUserSerislize.iat;
        // if(newUserSerislize.exp) delete newUserSerislize.exp;
        return jwt.sign(newUserSerislize, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' }); // 6h
    });
    return accessToken;
}

export const moveFileFunction = async (reqFile, reqPath) => {
    return new Promise(function (fulfill, reject){
        const fileName =  Date.now() + path.extname(reqFile.name);
        reqFile.mv(reqPath + fileName, (error) => {
            if (error) {
                reject(error);
            }
            const up_file_path = reqPath.replace('./public/', '') + fileName;
            fulfill({ up_file_path });
        })
    }).catch(err => err);
}