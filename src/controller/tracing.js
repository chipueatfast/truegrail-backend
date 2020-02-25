import { sequelize, Sequelize } from '~/sequelize/models/index';

async function handleIssueType(sneakerId) {
    const factoryPublicInfo = await sequelize.query(
        'select userIdentity, username from sneakers s join users u on s.factoryId = u.id where s.id = :sneakerId',
        { replacements: { sneakerId }, type: Sequelize.QueryTypes.SELECT }
    );
    if (!factoryPublicInfo) {
        return null;
    }
    const {
        userIdentity,
        username,
    } = factoryPublicInfo[0];
    return {
        factoryIdentity: userIdentity,
        factoryName: username,
    };
}

async function handleClaimType(claimerId) {
    const claimerPublicInfo = await sequelize.query(
        'select userIdentity, username from users where id = :claimerId',
        { replacements: { claimerId }, type: Sequelize.QueryTypes.SELECT }
    );
    const {
        userIdentity,
        username,
    } = claimerPublicInfo[0];
    return {
        claimerIdentity: userIdentity,
        claimerName: username,
    };
}

async function handleResellType({
    buyerId,
    sellerId,
}) {

    const buyerPublicInfo = await sequelize.query(
        'select userIdentity, username from users where id = :buyerId',
        { replacements: { buyerId }, type: Sequelize.QueryTypes.SELECT }
    );
    

    const sellerPublicInfo = await sequelize.query(
        'select userIdentity, username from users where id = :sellerId',
        { replacements: { sellerId }, type: Sequelize.QueryTypes.SELECT }
    );

    return {
        buyer: buyerPublicInfo[0],
        seller: sellerPublicInfo[0],
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
    let details = {
        resell: [],
    };
    for (const row of rows) {
        if (row.transaction_type === 'issue') {
            details.issue = await handleIssueType(row.sneaker_id);
        }
        if (row.transaction_type === 'claim') {
            details.claim = await handleClaimType(row.buyer_id);
        }
        if (row.transaction_type === 'resell') {
            details.resell.push(await handleResellType({
                buyerId: row.buyer_id,
                sellerId: row.seller_id,
            }));
        }}
    res.send(details);
}

export default {
    fetchDetailOfTransaction,
}