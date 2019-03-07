import Crypto from 'crypto';

import { sequelize } from '~/sequelize/models'

function generateSaltAndHash(password) {
    const salt = Crypto.randomBytes(256).toString('hex');
    const hash = Crypto.scryptSync(password, salt, 64);
    return {
        salt,
        hash,
    }
}

export default {
    generateSaltAndHash,
}
