import { sequelize } from '~/sequelize/models';

const getSingleValueAsync = (object, prop, value) =>  {
    return sequelize[object].find({
        where: {
            [prop]: value,
        }
    })
};

const createSingleRowAsync = (tableName, rowData) => {
    return sequelize[tableName].create(rowData)
}

export default {
    getSingleValueAsync,
    createSingleRowAsync,
}
