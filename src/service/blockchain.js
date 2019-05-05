import TruffleContract from 'truffle-contract';
import TrueGrailToken from '~/contracts/TrueGrailToken.json';
import Web3 from 'web3';

import Tx from 'ethereumjs-tx';

const network = {
    development: 'ws://127.0.0.1:8545',
    production: 'http://128.199.134.167:8546',
}

class BlockchainService {
    web3;
    contractInstance;
    constructor() {
        console.log(network[process.env.NODE_ENV]);

        switch (process.env.NODE_ENV) {
            case 'development': {
                this.web3 = new Web3(network[process.env.NODE_ENV]);
            }
        }
        const keyPair = {
            publicKey: process.env.GANACHE_PUB,
            privateKey: Buffer.from(process.env.GANACHE_PRI, 'hex'),
        };

        this.contractInstance = new this.web3.eth.Contract(TrueGrailToken.abi, '0x833bbEd979314708B071C672E213484024D11fd8');
        console.log(this.contractInstance.methods.tokenMetadata(211014440472470).encodeABI());
        const options = {
            from: keyPair.publicKey,
            to: '0x833bbEd979314708B071C672E213484024D11fd8',
            data: this.contractInstance.methods.tokenMetadata(211014440472470).encodeABI(),
            gasPrice: 3000,
            gasLimit: 250000,
            nonce: 1000,
        };
        const tx = new Tx(options);
        tx.sign(keyPair.privateKey);

        const rawTx = `0x${tx.serialize().toString('hex')}`;

        this.web3.eth.sendSignedTransaction(rawTx, (err, result) => {
            console.log('error: ',err);
            console.log('result: ', result);
        });

    }

    listenToIssueEvent(indexed, callback) {
        const {
            _tokenId,
        } = indexed;
        const issueEvent = contractInstance.Issue({
            _tokenId,
        });

        issueEvent.on('data', e => {
            callback();
        });
    }

    listenToTransferEvent(indexed, callback) {
        const {
            _tokenId, _to,
        } =  indexed;
        const transferEvent = contractInstance.Transfer({
            _tokenId,
        });

        transferEvent.on('data', e => {
            callback(e.returnValues);
        });
    }
}

export default new BlockchainService();