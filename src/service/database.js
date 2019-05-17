import { sequelize } from '~/sequelize/models';

const getRowBySingleValueAsync = (tableName, prop, value) =>  {
    return sequelize[tableName].find({
        where: {
            [prop]: value,
        },
    })
};

const createSingleRowAsync = (tableName, rowData) => {
    return sequelize[tableName].create(rowData)
}

export default {
    getRowBySingleValueAsync,
    createSingleRowAsync,
}
