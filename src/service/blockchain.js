import TrueGrailToken from '~/contracts/MinifiedTrueGrailToken.json';
import Web3 from 'web3';

import Tx from 'ethereumjs-tx';

const network = {
    development: 'ws://127.0.0.1:7545',
    production: 'http://128.199.134.167:8546',
}

class BlockchainService {
    web3;
    contractInstance;
    constructor() {
        switch (process.env.NODE_ENV) {
            case 'development': {
                this.web3 = new Web3(network[process.env.NODE_ENV]);
            }
        }

        this.contractInstance = new this.web3.eth.Contract(TrueGrailToken.abi, TrueGrailToken.address);

    }

    async listenToEvent(event, indexed, requestHandler) {
        // console.log('listen to event ', event, indexed);
        return new Promise((resolve) => {
            this.contractInstance.once(event, indexed, (err, event) => {
                if (event && event.returnValues) {
                    return requestHandler(resolve, event.returnValues)
                }
            })
        });
    }
}

export default new BlockchainService();