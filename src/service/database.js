import { sequelize } from '~/sequelize/models';

const getRowBySingleValueAsync = (tableName, prop, value) => {
    return sequelize[tableName].find({
        where: {
            [prop]: value,
        },
    })
};

const createSingleRowAsync = async (tableName, rowData, duplicateCondition) => {

    if (!!duplicateCondition && await sequelize[tableName].find({
        where: duplicateCondition,
    })) {
        return ({
            error: {
                statusCode: 400,
                message: 'Duplicated entity',
            }});
    }
    return sequelize[tableName].create(rowData)
}

export default {
    getRowBySingleValueAsync,
    createSingleRowAsync,
}
