import gateway from '~/service/braintree/index';
import { sequelize } from '~/sequelize/models/index';

const getClientToken = async (req, res) => {
    const {
        customerId,
    } = req.params;

    const customer = await sequelize.User.findOne({
        where: {
            id: customerId,
        },
    })

    gateway.clientToken.generate({
        ...(customer.haveCard ? {customerId} : {}),
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

const createTransaction = (req, res) => {
    const {
        customerId,
    } = req.params;
    const {
        nonceFromTheClient,
    } = req.body;

    gateway.paymentMethod.create({
        customerId: customerId.toString(),
        paymentMethodNonce: nonceFromTheClient,
    }, function (createErr, createResult) {
        if (createErr || createResult.errors) {
            return res.status(400).send({
                err: createErr || createResult.errors,
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

    });
}

export default {
    getClientToken,
    createTransaction,
}