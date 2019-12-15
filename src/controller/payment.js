import gateway from '~/service/braintree/index';
import { promisify } from 'util';

const getClientToken = async (req, res) => {
    // const {
    //     customerId,
    // } = req.params;
    // console.log(gateway);
    // const promisifiedTokenGenerate = promisify(gateway.clientToken.generate);
    // const token = await promisifiedTokenGenerate({
    //     customerId,
    // });
    gateway.clientToken.generate({}, function (err, response) {
        const clientToken = response.clientToken;
        return res.send({
            clientToken,
        });
    });
}


const createTransaction = async (req, res) => {
    const {
        nonceFromTheClient,
    } = req.body;
    const promisifiedTransactionMake = promisify(gateway.transaction.sale);
    const transactionResult = await promisifiedTransactionMake({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true,
        },
    });
    console.log(transactionResult);
    res.send({
        transactionResult,
    })
}

export default {
    getClientToken,
    createTransaction,
}