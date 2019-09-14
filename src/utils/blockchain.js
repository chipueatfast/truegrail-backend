import TrueGrailToken from '~/contracts/MinifiedTrueGrailToken.json';

import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import { promisify } from 'util';

const network = {
    development: 'ws://127.0.0.1:7545',
    production: 'ws://128.199.134.167:8545',
}

class BlockchainService {
    web3;
    contractInstance;
    constructor() {
        this.web3 = new Web3(network[process.env.NODE_ENV]);
        this.contractInstance = new this.web3.eth.Contract(TrueGrailToken.abi, TrueGrailToken.address);

    }
    
    async sendWei(toAddress) {
        const {
            GANACHE_PUB,
            GANACHE_PRI,
        } = process.env;
        const nonce = await this.web3.eth.getTransactionCount(GANACHE_PUB)
            .catch((e) => {
                console.log('loi ', e);
            });

        const txOptions = {
            from: GANACHE_PUB,
            to: toAddress,
            value: 1000000000000000000,
            gasPrice: 3000,
            gasLimit: 250000,
            nonce,
        };

        const tx = new Tx(txOptions);
        tx.sign(Buffer.from(GANACHE_PRI, 'hex'));

        const rawTx = `0x${tx.serialize().toString('hex')}`;

        const promisifiedSendSigned = promisify(this.web3.eth.sendSignedTransaction);

        return promisifiedSendSigned(rawTx);

        // this.web3.eth.sendSignedTransaction(rawTx, (err, result) => {
        //     console.log(err);
        //     return !err;
        // }).catch((e) => {
        //     console.log('err transaction: ', e);
        // });
    }

    async listenToEvent(event, indexed, requestHandler) {
        // TODO: change the way of listening event;
        let hasConducted = false;
        return new Promise((resolve) => {
            this.contractInstance.once(event, {
                filter: indexed,
            }, (err, event) => {
                // setTimeout(() => {
                // currently can not remove the event listener 
                if (event && event.returnValues && !hasConducted) {
                    hasConducted = true;
                    return requestHandler(resolve, event.returnValues)
                }
                // }, 20000);
            })
        });
    }
}

export default new BlockchainService();