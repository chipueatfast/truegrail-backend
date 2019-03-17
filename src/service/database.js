import { sequelize } from '~/sequelize/models';

const getSingleValueAsync = (object, prop, value) =>  {
    return sequelize[object].find({
        where: {
            [prop]: value,
        }
    })
};

export default {
    getSingleValueAsync,
}
