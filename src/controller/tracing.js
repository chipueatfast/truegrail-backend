import { sequelize, Sequelize } from '~/sequelize/models/index';

export default {
    fetchDetailOfTransaction,
}

async function handleIssueType(sneakerId) {
    const factoryPublicInfo = await sequelize.query(
        'select username from sneakers s join users u on s.factoryId = u.id where s.id = :sneakerId',
        { replacements: { sneakerId }, type: Sequelize.QueryTypes.SELECT }
    );
    if (!factoryPublicInfo) {
        return null;
    }
    const {
        username,
    } = factoryPublicInfo[0];
    return {
        sellerName: '',
        buyerName: '',
        factoryName: username,
        type: 'issue',
    };
}

async function handleClaimType(claimerId) {
    const claimerPublicInfo = await sequelize.query(
        'select username from users where id = :claimerId',
        { replacements: { claimerId }, type: Sequelize.QueryTypes.SELECT }
    );
    const {
        username,
    } = claimerPublicInfo[0];
    return {
        sellerName: '',
        buyerName: username,
        factoryName: '',
        type: 'claim',
    };
}

async function handleResellType({
    buyerId,
    sellerId,
}) {

    const buyerPublicInfo = await sequelize.query(
        'select username from users where id = :buyerId',
        { replacements: { buyerId }, type: Sequelize.QueryTypes.SELECT }
    );
    
    const {
        username: buyerName,
    } = buyerPublicInfo[0];

    const sellerPublicInfo = await sequelize.query(
        'select username from users where id = :sellerId',
        { replacements: { sellerId }, type: Sequelize.QueryTypes.SELECT }
    );

    const {
        username: sellerName,
    } = sellerPublicInfo[0];

    return {
        factoryName: '',
        buyerName,
        sellerName,
        type: 'resell',
    }
}

async function fetchDetailOfTransaction(req, res) {
    const {
        rows,
    } = req.body;
    if (!rows.length) {
        res.status(400).send({
            message: 'EMPTY_BODY',
        })
    }
    let details = [];
    for (const row of rows) {
        const id = row.id;
        if (row.transaction_type === 'issue') {
            details.push({
                id,
                ... await handleIssueType(row.sneaker_id),
            })
        }
        if (row.transaction_type === 'claim') {
            details.push({
                id,
                ... await handleClaimType(row.buyer_id),
            })}
        if (row.transaction_type === 'resell') {
            details.push({
                id,
                ...await handleResellType({
                    buyerId: row.buyer_id,
                    sellerId: row.seller_id,
                }),
            });
        }
    }
    res.send(details);
}
