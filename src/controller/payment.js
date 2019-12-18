import gateway from '~/service/braintree/index';
import { sequelize } from '~/sequelize/models/index';

const getClientToken = async (req, res) => {
    const {
        userId,
    } = req.params;

    const user = await sequelize.User.findOne({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(400).send({
            message: 'NO_USER',
        })
    }
    const {
        customerId,
    } = user;

    gateway.clientToken.generate({
        ...(customerId ? {customerId} : {}),
    }, function (err, response) {
        if (err) {
            res.send({
                err,
            })
        }
        const clientToken = response.clientToken;
        return res.send({
            clientToken,
        });
    });
}

const createTransaction = async (req, res) => {
    const {
        userId,
    } = req.params;
    const {
        nonceFromTheClient,
    } = req.body;

    const user = await sequelize.User.findOne({
        where: {
            id: userId,
        },
    });
    const {
        customerId,
    } = user;
    if (!customerId) {
        gateway.customer.create({
            firstName: user.username,
            lastName: 'truegrail',
            paymentMethodNonce: nonceFromTheClient,
        }, async function (err, result) {
            if (!err && result.success) {
                await user.update({
                    customerId: result.customer.id,
                });
            }
        });
    }

    gateway.transaction.sale({
        amount: "5.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true,
        },
    }, function (saleErr, saleResult) {
        if (saleErr || saleResult.errors) {
            return res.status(400).send({
                err: saleErr || saleResult.errors,
            });
        }
        console.log(saleResult);
        res.send({
            saleResult,
        });
    });

    // gateway.paymentMethod.create({
    //     customerId: customerId.toString(),
    //     paymentMethodNonce: nonceFromTheClient,
    // }, function (createErr, createResult) {
    //     if (createErr || createResult.errors) {
    //         return res.status(400).send({
    //             err: createErr || createResult.errors,
    //         });
    //     }
        

    // });
}

export default {
    getClientToken,
    createTransaction,
}